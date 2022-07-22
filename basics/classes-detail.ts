abstract class Department {
  // private id: string;
  // private name: string;
  protected employees: string[] = [];
  static fiscalYear = 2022;

  constructor(private readonly id: string, public name: string) {
    // this.name = name
  }

  abstract describe(this: Department):void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }
  describe(this: Department): void {
      console.log('This is IT Department')
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) { 
      return this.lastReport;
    }

    throw new Error("No report exist !!");
  }

  describe(this: Department): void {
    console.log('This is Accounting Department')
}

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("value is missing !!");
    }

    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0]
  }

  static getInstance() {
    if(AccountingDepartment.instance) {
        return this.instance;
    }

    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  addEmployee(employee: string): void {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("D1", ["Max"]);
it.describe();
it.addEmployee("Arvind");
it.addEmployee("Natasha");
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();
accounting.describe();
accounting.addEmployee("Max");
accounting.addEmployee("Ruth");
accounting.printEmployeeInformation();
accounting.mostRecentReport = "Year end report";
accounting.printReports();
console.log('latest report', accounting.mostRecentReport);
console.log(Department.fiscalYear);



// const accountingCopy = {name: 'Dummy', describe: accounting.describe}
// accountingCopy.describe();
