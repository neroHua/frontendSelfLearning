function Person(name , age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

Person.prototype.like = [];
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

function Student(school) {
    this.school = school;
}

Student.prototype = new Person("name00", 0, ["address00"]);

var student1 = new Student("school01");
student1.name = "name01";
student1.age = 1;
student1.address.push("address01");
student1.like.push("like01");
student1.high = 1;

var student2 = new Student("school02");
student2.name = "name02";
student2.age = 2;
student2.address.push("address02");
student2.like.push("like02");
student2.high = 2;

document.write(student1 + typeof(student1) + (student1 instanceof Object) + (student1 instanceof Person) + (student1 instanceof Student) + "<br/>");
document.write(student1.name + student1.age + student1.address + student1.like + student1.high + student1.school + "<br/>");

document.write(student2 + typeof(student2) + (student2 instanceof Object) + (student2 instanceof Person) + (student2 instanceof Student) + "<br/>");
document.write(student2.name + student2.age + student2.address + student2.like + student2.high + student2.school + "<br/>");

document.write("<br/>")

function Personx(name , age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

Personx.prototype.like = [];
Personx.prototype.high = 183;

Personx.prototype.getName = function() {
    return this.name;
}
    
Personx.prototype.setName = function(name) {
    this.name = name;
}
    
Personx.prototype.getAge = function() {
    return this.age;
}
    
Personx.prototype.setAge = function(age) {
    this.age = age;
}

function Studentx(name, age, address, school) {
    Personx.call(this, name, age, address);
    this.school = school;
}

Studentx.prototype = new Personx();

var studentx1 = new Studentx("name01", 1, "address01", "school01");
studentx1.like.push("like01");
studentx1.high = 1;

var studentx2 = new Studentx("name02", 2, "address02", "school02");
studentx2.like.push("like02");
studentx2.high = 2;

document.write(studentx1 + typeof(studentx1) + (studentx1 instanceof Object) + (studentx1 instanceof Person) + (studentx1 instanceof Student) + "<br/>");
document.write(studentx1.name + studentx1.age + studentx1.address + studentx1.like + studentx1.high + studentx1.school + "<br/>");

document.write(studentx2 + typeof(studentx2) + (studentx2 instanceof Object) + (studentx2 instanceof Person) + (studentx2 instanceof Student) + "<br/>");
document.write(studentx2.name + studentx2.age + studentx2.address + studentx2.like + studentx2.high + studentx2.school + "<br/>");

document.write("<br/>")