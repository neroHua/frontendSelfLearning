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