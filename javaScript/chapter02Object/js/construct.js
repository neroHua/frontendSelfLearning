function Person(name , age) {
    this.name = name;
    this.age = age;
    
    this.getName = function() {
        return this.name;
    }
    
    this.setName = function(name) {
        this.name = name;
    }
    
    this.getAge = function() {
        return this.age;
    }
    
    this.setAge = function(age) {
        this.age = age;
    }
    
}

var person1 = new Person("name01", 3);

document.write(person1 + typeof(person1) + (person1 instanceof Object) + (person1 instanceof Person) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() +  person1.getAge() + "<br/>");

person1.setName("name02");
person1.setAge(4);

document.write(person1 + typeof(person1) + (person1 instanceof Object) + (person1 instanceof Person) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() +  person1.getAge() + "<br/>");

document.write("<br/>")

var person2 = new Person("name01", 3);
document.write(person2 + typeof(person2) + (person2 instanceof Object) + (person2 instanceof Person) + "<br/>");
document.write(person2.name +  person2.age + "<br/>");
document.write(person2.getName() + person2.getAge() + "<br/>");

person2.setName("name03");
person2.setAge(5);

document.write(person2 + typeof(person2) + (person2 instanceof Object) + (person2 instanceof Person) + "<br/>");
document.write(person2.name +  person2.age + "<br/>");
document.write(person2.getName() +  person2.getAge() + "<br/>");

document.write(person1.name == person2.name)
document.write(person1.age == person2.age)
document.write(person1.name === person2.name)
document.write(person1.age === person2.age)
