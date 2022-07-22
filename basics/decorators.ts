function Logger(logString: string) {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookid: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    orignalContructor: T
  ) {
    return class extends orignalContructor {
      constructor(..._: any[]) {
        super();
        const el = document.getElementById(hookid);
        if (el) {
          el.innerHTML = template;
          el.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('PERSON-LOGGING')
@WithTemplate("<h1></h1>", "app")
class Person {
  name = "Arvin";
  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

function PropertyDecorator(target: any, propertyName: string) {
    console.log('Property descriptor');
    console.log(target);
    console.log(propertyName);
}

function AccesorDescriptor(target: any, accesorName:string, descriptor: PropertyDescriptor) {
    console.log('Accessor descriptor');
    console.log(target);
    console.log(accesorName);
    console.log(descriptor);
}

function MethodDescriptor(target: any, methodName:string, descriptor: PropertyDescriptor) {
    console.log('Method descriptor');
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
}

function ParameterDescriptor(target: any, methodName: string, positonOfArgument: number) {
    console.log('Parameter descriptor');
    console.log(target);
    console.log(methodName);
    console.log(positonOfArgument);
}

class Product {
    @PropertyDecorator
    title: string;
    private _price: number

    @AccesorDescriptor
    set price(val: number) {
        if( val > 0) {
            this._price = val
        } else {
            throw new Error('Price cannot be negative')
        }
    }

    constructor(t:string, p: number) {
        this.title = t;
        this._price = p
    }

    @MethodDescriptor
    getPriceWithTax(@ParameterDescriptor tax: number) {
        return this._price*(1+tax)
    }
}

// Method Validator

function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const orignalMethod= descriptor.value;
    const adjDescriptor:PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = orignalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}


class Printer {
    message: string;
    constructor(m: string) {
        this.message = m;
    }
    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const  p = new Printer('This works !');

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);


// Property Validator

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], 
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function Positive(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], 
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) {
         return true;
    }
    let isValid = true;
    for( const prop in objValidatorConfig) {
        for( const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive' :
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    
    return isValid
}

class Course {
    @Required
    title: string;
    @Positive
    price: number;

    constructor(t:string, p:number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', event => {
    event.preventDefault();

    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl?.value;
    const price = +priceEl?.value;

    const createCourse = new Course(title, price);

    if(!validate(createCourse)) {
        alert('Invalid input, please try again!')
        return;
    }
    console.log(createCourse);
});
