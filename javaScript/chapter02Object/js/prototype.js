function Person(name , age) {
    this.name = name;
    this.age = age;
}

Person.prototype.address = [];
Person.prototype.high = 183;

Person.prototype.getName = function() {
    return this.name;
}
    
Person.prototype.setName = function(name) {
    this.name = name;
}
    
Person.prototype.getAge = function() {
    return this.age;
}
    
Person.prototype.setAge = function(age) {
    this.age = age;
}

 
var person1 = new Person("name01", 3);
person1.address.push("address1");
person1.high = 184;

document.write(person1 + typeof(person1) + (person1 instanceof Object) + (person1 instanceof Person) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() + person1.getAge() + person1.address + person1.high + "<br/>");

person1.setName("name02");
person1.setAge(4);

document.write(person1 + typeof(person1) + (person1 instanceof Object) + (person1 instanceof Person) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() + person1.getAge() + person1.address + person1.high + "<br/>");

document.write("<br/>")

var person2 = new Person("name01", 3);
person2.address.push("address2");
person2.high = 185;

document.write(person2 + typeof(person2) + (person2 instanceof Object) + (person2 instanceof Person) + "<br/>");
document.write(person2.name +  person2.age + "<br/>");
document.write(person2.getName() + person2.getAge() + person2.address + person2.high + "<br/>");

person2.setName("name03");
person2.setAge(5);

document.write(person2 + typeof(person2) + (person2 instanceof Object) + (person2 instanceof Person) + "<br/>");
document.write(person2.name +  person2.age + "<br/>");
document.write(person2.getName() + person2.getAge() + person2.address + person2.high + "<br/>");
document.write(person1.getName() + person1.getAge() + person1.address + person1.high + "<br/>");

document.write(person1.name == person2.name);
document.write(person1.age == person2.age);
document.write(person1.address == person2.address);
document.write(person1.high == person2.high);
document.write(person1.name === person2.name);
document.write(person1.age === person2.age);
document.write(person1.address === person2.address);
document.write(person1.high === person2.high);

document.write("<br/>")

function Person2(name, age) {
    this.name = name;
    this.age = age;
}

Person2.prototype = {
    construct : Person2(),

    address : [],
    high : 0,

    getName : function() {
        return this.name;
    },
    
    setName : function(name) {
        this.name = name;
    },
    
    getAge : function() {
        return this.age;
    },
    
    setAge : function(age) {
        this.age = age;
    }
}

var personx1 = new Person2("name01", 3);
personx1.address.push("address1");
personx1.high = 184;

document.write(personx1 + typeof(personx1) + (personx1 instanceof Object) + (personx1 instanceof Person2) + "<br/>");
document.write(personx1.name +  personx1.age + "<br/>");
document.write(personx1.getName() + personx1.getAge() + personx1.address + personx1.high + "<br/>");

personx1.setName("name02");
personx1.setAge(4);

document.write(personx1 + typeof(personx1) + (personx1 instanceof Object) + (personx1 instanceof Person2) + "<br/>");
document.write(personx1.name +  personx1.age + "<br/>")
document.write(personx1.getName() + personx1.getAge() + personx1.address + personx1.high + "<br/>");

document.write("<br/>")

var personx2 = new Person2("name01", 3);
personx2.address.push("address2");
personx2.high = 185;

document.write(personx2 + typeof(personx2) + (personx2 instanceof Object) + (personx2 instanceof Person2) + "<br/>");
document.write(personx2.name +  personx2.age + "<br/>");
document.write(personx2.getName() + personx2.getAge() + personx2.address + personx2.high + "<br/>");

personx2.setName("name03");
personx2.setAge(5);

document.write(personx2 + typeof(personx2) + (personx2 instanceof Object) + (personx2 instanceof Person2) + "<br/>");
document.write(personx2.name +  personx2.age + "<br/>");
document.write(personx2.getName() + personx2.getAge() + personx2.address + personx2.high + "<br/>");
document.write(personx1.getName() + personx1.getAge() + personx1.address + personx1.high + "<br/>");

document.write(personx1.name == personx2.name);
document.write(personx1.age == personx2.age);
document.write(personx1.address == personx2.address);
document.write(personx1.high == personx2.high);
document.write(personx1.name === personx2.name);
document.write(personx1.age === personx2.age);
document.write(personx1.address === personx2.address);
document.write(personx1.high === personx2.high)