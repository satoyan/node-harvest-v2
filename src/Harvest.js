'use strict';

let HeaderAuth = require('./authentication/HeaderAuth'),
    fs = require('fs'),
    path = require('path'),
    camelCase = require('lodash/camelCase');

const apiFiles = [
    "Client_Contacts",
    "Clients",
    "Company",
    "Estimate_Item_Categories",
    "Estimate_Line_Item",
    "Estimate_Messages",
    "Estimates",
    "Expense_Categories",
    "Expenses",
    "Invoice_Item_Categories",
    "Invoice_Line_Item",
    "Invoice_Messages",
    "Invoice_Payments",
    "Invoices",
    "Projects",
    "Project_Task_Assignments",
    "Project_User_Assignments",
    "Roles",
    "Tasks",
    "Time_Entries",
    "User_Project_Assignments",
    "Users",
];

module.exports = class Harvest {
    constructor(config) {
        this.headerAuth = new HeaderAuth(config);

        this.options = {
            url: '',
            method: '',
            headers: this.headerAuth.header(),
            body: '',
            resolveWithFullResponse: false
        };

        apiFiles.forEach(name => {
            let prop = camelCase(name);
            let Resource = require(`./api/${name}`);
            this[prop] = new(Resource)(this.options);
        })

        // fs.readdirSync(path.join(__dirname, 'api')).forEach(name => {
        //     // Refacto this line
        //     let prop = camelCase(name.slice(0, -3));
        //     let Resource = require(`./api/${name}`);

        //     this[prop] = new(Resource)(this.options);
        // });
    }
};
