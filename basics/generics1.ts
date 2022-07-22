// In Built Generics
const names:Array<string> = ["Arvin","Natasha"]
names[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject)) => {
    setTimeout(() => {
        resolve(10)
    }, 2000);
});

promise.then(data => {
    data.split(' ')
})


function merge<T extends object, U extends object>(objA: T,objB: U) {
    return Object.assign(objA, objB);
}

const mergeObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergeObj);

interface Lenghty {
    length: number;
}

// This is function which implements generics by making sure the passed object has a length property
function countAndDescribe<T extends Lenghty>(item: T): [T, string] {
    let description = "has no value";

    if(item.length === 1) {
       description = "haa one item";
    } else if (item.length > 1) {
        description = `has ${item.length} item`;
    }

    return [item, description];
}

// Partials making options properies which can be added laters
interface CourseGoal {
    title:string,
    description: string,
    completeUntil: Date
}
function creteCourseGoal(title: string, description: string, date:Date): CourseGoal {
    let courseGoal: Partial <CourseGoal> = {}
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}


console.log(countAndDescribe('Hello'));

// This function implements generics where the second param expcets proprty name of first obj as parameter
function extractAndConvert<T extends object, U extends keyof T>(obj:T, key: U) {
    return 'Value' + obj[key];
}

extractAndConvert({name: 'Max'}, 'name');

// generic class 

class DataStorage<T extends string | number | boolean> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Arvin')
textStorage.addItem(10)

// Read only type
const names: Readonly<string[]> = ["Max", "Manu"],
names.push('Anna');

