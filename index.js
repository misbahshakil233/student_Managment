import inquirer from 'inquirer';
import chalk from 'chalk';
let balance = 7000;
let studentName;
let enrolledCourse;
const tuitionFees = {
    "MSOffice": 2500,
    "Graphic Design": 4000,
    "Web and mobile ": 65000,
    "Web3.0": 10000,
};
async function main() {
    while (true) {
        let operators = await inquirer.prompt([
            {
                name: "operator",
                type: "list",
                message: chalk.bold.yellowBright("Select an operator:"),
                choices: ["Add Student", "Enroll in Course", "View Balance", "Pay Tuition Fees", "Show Status", "Exit"]
            }
        ]);
        if (operators.operator === "Exit") {
            console.log(chalk.green("Exiting..."));
            break;
        }
        else if (operators.operator === "Add Student") {
            await addStudent();
        }
        else if (operators.operator === "Enroll in Course") {
            if (studentName) {
                await enrollInCourse();
            }
            else {
                console.log(chalk.red("Please add a student first."));
            }
        }
        else if (operators.operator === "View Balance") {
            console.log(chalk.blue(`Your current balance is: $${balance}`));
        }
        else if (operators.operator === "Pay Tuition Fees") {
            await payTuitionFees();
        }
        else if (operators.operator === "Show Status") {
            showStatus();
        }
    }
}
async function addStudent() {
    let answer = await inquirer.prompt([
        {
            name: "students",
            message: 'Enter Your Name:',
            type: 'input',
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value";
            }
        }
    ]);
    studentName = answer.students;
    console.log(chalk.green(`Student ${studentName} added successfully.`));
}
async function enrollInCourse() {
    let answer = await inquirer.prompt([
        {
            name: 'courses',
            message: 'Select Courses to Enroll:',
            type: 'list',
            choices: ["Web and mobile ", "Graphic Design", "Web3.0", "MSOffice"]
        }
    ]);
    enrolledCourse = answer.courses;
    const tuitionFee = tuitionFees[enrolledCourse];
    console.log(`\nTuition Fees: $${tuitionFee}`);
    if (tuitionFee <= balance) {
        console.log(chalk.green("You are eligible to enroll."));
    }
    else {
        console.log(chalk.red("Sorry, your balance is low."));
    }
}
async function payTuitionFees() {
    if (enrolledCourse) {
        const tuitionFee = tuitionFees[enrolledCourse];
        if (tuitionFee <= balance) {
            balance -= tuitionFee;
            console.log(chalk.green(`Tuition fee paid for ${enrolledCourse}.`));
        }
        else {
            console.log(chalk.red("Insufficient balance to pay tuition fees."));
        }
    }
    else {
        console.log(chalk.red("You are not enrolled in any course."));
    }
}
function showStatus() {
    console.log(chalk.blue(`Student Name: ${studentName || "Not enrolled"}`));
    console.log(chalk.blue(`Enrolled Course: ${enrolledCourse || "None"}`));
    console.log(chalk.blue(`Current Balance: $${balance}`));
}
main();
