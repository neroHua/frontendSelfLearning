var person = new Object();
document.write(person + typeof(person) + "<br/>");

person.name = "name01";
person.age = 3;

person.getName = function() {
    return this.name;
}

person.setName = function(name) {
    this.name = name;
}

person.getAge = function() {
    return this.age;
}

person.setAge= function(age) {
    this.age = age;
}

document.write(person + typeof(person) + (person instanceof Object) + "<br/>");
document.write(person.name +  person.age + "<br/>");
document.write(person.getName() +  person.getAge() + "<br/>");

person.setName("name02");
person.setAge(4);

document.write(person + typeof(person) + (person instanceof Object) + "<br/>");
document.write(person.name +  person.age + "<br/>");
document.write(person.getName() +  person.getAge() + "<br/>");

document.write("<br/>")

var person1 = {
    name : "name01",
    age : 3,
    getName : function() {
        return this.name;

    },
    setName : function(name) {
        this.name = name;
    },
    getAge: function() {
        return this.age;

    },
    setAge: function(age) {
        this.age = age;
    }
}

document.write(person1 + typeof(person1) + (person1 instanceof Object) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() +  person1.getAge() + "<br/>");

person1.setName("name03");
person1.setAge(5);

document.write(person1 + typeof(person1) + (person1 instanceof Object) + "<br/>");
document.write(person1.name +  person1.age + "<br/>");
document.write(person1.getName() +  person1.getAge() + "<br/>");

document.write("<br/>")
document.write(person1.name == person.name)
document.write(person1.age == person.age)
document.write(person1.name === person.name)
document.write(person1.age === person.age)