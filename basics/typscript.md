
# What is Typescript
* Typescript is a superset of javascript
* It needs to be compiled to javascript use tsc compiler
* Since javascript is dynamically typed lanaguage as it infers the type based on what the value 
* Typescript provide a strong type feature

# Core Types
* number
* string
* boolean
* Object
* Array
* Tuple - Fixed length array
* Enum  -
    e.g.  
        enum Role {
            ADMIN = 2
        }

# More types
* Union
* Literal - e.g. resultConvversion: 'as-number' | 'as-text'
* void  
* unknown
* never
* any 


# Type Assertion
* e.g. 
        
         let page: unknown = "1";
         let pageNumber: number = (page as unknown) as number

# Interface
* We can create our own type using Interfaces in Typescript
    e.g.
    
        interface Contact {
            id:number,
            name: string,
            birthDate?: Date
        }

# Working with DOM
* Typescript does not understand the document object as it comes from the browser, So you need to make it explicit that is and HTMLInputElement by Type assertion
* Exclaimation tell TS that expression won't return null
* as HTMLInputElement explicitly gives its type

        const button = document.querySelector('button')! as HTMLInputElement

        button.addEventlistener(event) {
            target = event.target as HTMLInputElement;
            console.log(target.value)
        }

# Generics
* This helps to create a generic template which can take any data type which is pass to the function, helps to avoid code duplicacy since we don't need to create new interface or functions for different types

* Function 

        const addId = <T extends object>(obj: T) => {
            const id = Math.random().toString(16);
            return {
                ...obj,
                id,
            }
        }

*  Interface

        interface UserInterface<T> {
            name: string;
            data: T;
        }

You can also own type base on extising types using type key word
e.g. type ContactName = string

* Enum is special type where we have hardcoded values which appear as list

* functions in typescript can also have function parameter type and even a return type to make it clear what the functions return

* generics infer the type of the input this can be any type and they can be applied to classes and interface as well.

* Type Alias
    * Provide a custom type to support multiple types 
      e.g. type ContactBirthDate = Date | number | string
    * Create a interface with combination of multiple interfaces
    interface Custom extends I1, I2
    * replace Enum with alias type to 
    type ContactStatus = "active" | "inactive" | "new"
    * Advantages
      * This does not add to the final code 
      * This allow same implementation with less code
      * Editor provide list of supported values


keyof type gives list of keys from a object and gives a list of values to be added
e.g. 
    type ContactFields = keyof Contact

    function getValue<T>(source: T, propName: keyof T) {
        return source[propName];
    }

    const value = getValue({min:10, max: 100}, "max")


# Index access type
const Contact {
    name:string
}

const test: Contact["name"]

# Utitlity type

Record type is alternative for any time
let  x: Record<{possible property value}, {possible property type}>
e.g. let  x: Record<string, string | number | Function>


# Partial 
e.g. type ContactQuery = Partial <Record<keyof Contact, Query>>
Omit
Pick
Required

# Mapped type
type ContactQuery = {
    [TProp in keyof Contact]? : Query<Contact[TProp]>
}

# Decoraters
- Meta data 
- add functionality to code with changing the underlining function
- we need to implement a function with following parameter
    - target
    - property
    - descriptor

- Method Decorators - target, property, descriptor
- Class Decoraters - target/constructor
- property Decoraters- target, key

# Class
* Its a blueprint to create object which resemble real life entities.
* Class has properties, constructor and methods
* properties can be defined as constructor parameter with the access type or directly on the class as well
* Access modifiers
    * Public - default no need to mention, but should be mentioned inside the constructor for declaration
    * Private - only accesible inside the Class
    * Protected - accesible inside the class and childrens of the class
    * Static 
        * Directly available on the class, no need to intiate a new object to access it e.g. Math.Pi
        * To Access inside the class we need to use the class name and not the this key word

* Class is more of a syntactical sugar in javascript which is basically mimmiced using the IIFE 

# Inhertance
* Use extends key work to extend a base class
* All public and protected properties of the parent are accesible in the childrens
* Constructor needs to call a super method before any thing specific to child in initialized
* Child can even override a parents method, to change it's implementation
* This is mostly managed by javascript prototype chaining

# Abstract
* When you want a child of the class to implement/overrdide a method based on the way the child requires it 
* Class need to make this method with 'abstract' key word need not provide any implementation and also should make the class as abstract
* oOce the class is marked as abstract it can't create its own object instead it should always be inherited

# Private constructor to create a Singleton 
* To make use of singleton to make sure we only have one instance of a class.


# Interfaces
* defined structure of an object
* It forces the class to implement that structure / contract 
* It's more like abstract class but it can't have any implementation where as abstract class can have
* they are also more similar to custom types
* they can have readonly properties which are set only once
* they can extend other interfaces
* they are also use to define a function instead using custom type is more common for this 
* optional properties can be creaeted by using ? after the property name in interface, classe and constructor as well
* More on (JS) Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
* More on TS Interfaces: https://www.typescriptlang.org/docs/handbook/2/objects.html


# Advance Type
* Intersection types - intersect two types with ampersend 

        type Combinale = string | number
        type Numberic = number | boolean

        type Universal = Combinale & Numberic

* Type Gaurds
    * typeof which works for native javascript types like string, number, boolean, object
    * But this does not work for custom types in that case we could use the if ('<property-name>' in object)
    * for classes we could use the instanceof to gaurds
* Descriminate Unions
    * This is done on base of a common proper in all the interface in the Union
    * Typescript understands this and provide support in Editor for the same

            interface Brid {
                type:'bird';
                flyingSpeed: number;
            }

            interface Horse {
                type:'bird';
                runningSpeed: number;
            }
* Index Properties types
    * In ascenario where you don't the key's of the properties and even the value you can use Index types
    * key type could be string or number
            
            interface ErrorContainer {
                [porp/key: string]: string;
            }

# Function overload
* Allow same function with different signitures / params 
* In TS we need to add the other signiture above the  method declaration 
e.g.    

        function add(a: number, b: number): number {
        function add(a: string, b: string): string {
            if(typeof a === 'string' || b === 'string') {
                return a.toString() + b.toString()
            }

            return a + b; 
        }

# Optional Chaining
* Instead of chaining long chains like Obj.job && obj.job.title we can simply use below syntax
e.g.
        
        Object?.job?.title

# Nullish Coalescing
* When we want a default value in JS we use  const title = userTile || 'Title' in this case even if the userTitle is empty string then it would set the default value, but if we can to only check for bull or undefine in we can use a **??** instead 
    
            const title = userTile ?? 'Title'

More on Advanced Types: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html


# Generics
* Type which work with other types like Array<string>
* Built in types
    * Array - Array <string>
    * Promise - Promise <string></string>
* Custom - function merge<T,U>(objA:T, objB:U)
* Here you define a objA should be of type T and B of type U this would take any type for the params
* We can constrain the types using type constraints - function merge<T extends object, U extends object>(objA:T, objB:U), So now the params will have to of type Object 
                 


# Decoraters
* used for meta programming
* Writing code to other user of codemake sure our classes or code are used correctly
* Classes get used correctly, add some hidden functionality
* Added with @ symbol and the decorator name which points to function not executes it
* It needs to have a parameter which points to the constructor function 
* Decorators are executed when your class is defined not on instantiation of object

        function Logger(constructor: Function) {
            console.log('Logging...');
            console.log(constructor);
        }

        @Logger
        class Person {
            name = 'Arvin'
            constructor() {
                console.log('Creating person object...');
            }
        }

        const pers = new Person();

* Decorators facory gives more control and power on what the decorator does

        function Logger(logString) {
            return (constructor: Function) => {
                console.log(logString);
                console.log(constructor);
            }
        }

        @Logger('PERSON-LOGGING')
        class Person {
            name = 'Arvin'
            constructor() {
                console.log('Creating person object...');
            }
        }

        const pers = new Person();

* We can apply multiple decorators to a class 
* Decoraters execute bottom up order which Decoraters facory function executes in order they are specified since factory are simple javascript functions

        @Logger('PERSON-LOGGING')
        @Component('<h1>Person Object goes here</h1>', 'app')
        class Person {
            name = 'Arvin'
            constructor() {
                console.log('Creating person object...');
            }
        }

* Decorators can be applied to 
    * Class - it get only one parameter that is the target/constructor parameter
    * Property of a class - it get 3 parameters target, name, descriptor
    * Setter of a class 
    * Method of a class - it get 3 parameters target, name, descriptor
    * Method parameter - it get 3 parameters target, name of the method, postion of the parameter

* Class Acessor and Method Decorator are able to return somethings



