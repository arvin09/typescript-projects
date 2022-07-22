interface IUser {
    getFullname(): string, 
} 
class User implements IUser{
    private firstName: string;
    private lastName:string;
    readonly unchangeableName: string;
    static readonly maxAge = 50;

    constructor(firstName: string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.unchangeableName = firstName;
    }

    changeUnchangeableName(): void {
        // this.unchangeableName = 'foo';
    }

    getFullname(): string {
        return this.firstName + " " + this.lastName;
    }
}

class Admin extends User {
    private editor: string;

    constructor(editor:string, firstName: string, lastName: string) {
        super(firstName, lastName);
        this.editor = editor;
    }

    setEditor(editor: string): void {
        this.editor = editor;
    }

    getEditor(): string {
        return this.editor;
    }
}

const user = new User("Arvind", "Waghmare");
console.log(user.getFullname());

const admin = new Admin('Natasha', 'Gomes')
console.log(admin.getFullname())