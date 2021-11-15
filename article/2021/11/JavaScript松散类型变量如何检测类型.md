今天要分享的问题就是：**如何在JS中检查一个变量的类型？**

先上结论：
**如果判断的是基本数据类型或JavaScript内置对象，使用toString；如果要判断的是自定义类型，请使用instanceof。**

在 ECMAScript 规范中，共定义了 7 种数据类型，分为 **基本类型** 和 **引用类型** 两大类。

*基本类型* 也称为简单类型，按值访问。
![](https://files.mdnice.com/user/20968/d6f778a1-e51a-4093-995c-6b9e3408f3d3.png)
*引用类型* 也称为复杂类型，按址访问。
JavaScript内置了一些引用类型，如图所示：
![](https://files.mdnice.com/user/20968/6bd4614e-c5fe-4b51-8168-d70f546031bf.png)

JavaScript的变量是松散类型。虽然这使得提供类型信息的方式更加灵活了，但也容易误用。

下面来分析常见的四种JavaScript类型检查方法：`typeof`, `instanceof`, `constructor`, `toString`。

### typeof

`typeof`是一个操作符，其右侧跟一个一元表达式，并返回这个表达式的数据类型。

它返回的结果用该类型的字符串(全小写字母)形式表示。返回值有7种取值：`number`、`boolean`、`symbol`、`string`、`undefined`、`object`和`function`。
```javascript
typeof 3; // number 有效
typeof true; //boolean 有效
typeof Symbol(); // symbol 有效
typeof ''; // string 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof [] ; //object 无效
typeof new Function(); // function 有效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效
```

有些时候，`typeof`操作符会返回一些令人迷惑但技术上却正确的值：

- 对于*基本类型* ，除 `null` 以外，均可以返回正确的结果。
- 对于*引用类型* ，除 `function` 以外，一律返回`object`类型。
- 对于`null` ，返回`object`类型。**这是一个知名的bug。由于影响范围越来越大，就没有修复了。**
- 对于`function` 函数，返回 function 类型。从技术角度讲，函数在ECMAScript中是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过typeof操作符来区分函数和其他对象是有必要的。

由上可以得出：
`typeof`对*引用类型* 操作的返回值不是我们想要的结果。

### instanceof

`instanceof`是用来判断 A 是否为 B 的实例的。它的表达式为：`A instanceof B`。

如果 A 是 B 的实例，则返回 true，否则返回 false。 在这里需要特别注意的是：instanceof断规则是`某个对象的原型链是否包含某个构造函数的prototype属性`。
```JavaScript
let arr = [];
arr instanceof Array; // true
arr instanceof Object; // true
```

看看arr原型链简图：
![](https://files.mdnice.com/user/20968/3ba65ff4-e2c9-4f61-8d1c-700211d243ce.png)

对象arr的 `__proto__`  直接指向`Array.prototype`，间接指向 `Object.prototype`，所以按照 `instanceof` 的判断规则，[] 就是Array的实例，也是Object的实例。`instanceof`返回值都是`true`。

依此类推，`RegExp`, `Object`, `Function`也会形成一条对应的原型链 。
```JavaScript
/abc/ instanceof RegExp // true
({}) instanceof Object // true
(function(){}) instanceof Function // true
```
`instanceof`是通过原型链来检查类型的，所以适用于任何"object"的类型检查。自定义的类型同样满足。
```JavaScript
// 比如直接原型关系
function Fruit(){ }
(new Fruit) instanceof Fruit     // true

// 原型链上的间接原型
function Apple(){}
Apple.prototype = new Fruit
(new Apple) instanceof Fruit         // true
```

注意`instanceof`对*基本数据类型* 不起作用，因为基本数据类型没有原型链。
```JavaScript
3 instanceof Number // false
true instanceof Boolean // false
'abc' instanceof String // false
null instanceof String  // always false
undefined instanceof String  // always false
```
但你可以这样：
```JavaScript
new Number(3) instanceof Number // true
new Boolean(true) instanceof Boolean // true
new String('abc') instanceof String // true
```
但这时你已经知道数据类型了，类型检查已经没有意义了。

### 使用constructor属性

`constructor` 属性返回一个指向创建了该对象原型的函数引用。需要注意的是，该属性的值是那个函数本身。例如：
```JavaScript
function Fruit(){}
var a = new Fruit
a.constructor === Fruit    // true
```
**constructor不适合用来判断变量类型。**
- 其一，它是一个属性，非常容易被伪造：
```JavaScript
var a = new Fruit
a.constructor === Array
a.constructor === Fruit    // false
```
- 其二，`constructor`指向的是最初创建当前对象的函数，是原型链最上层的那个方法：
```JavaScript
function Apple(){}
Apple.prototype = new Fruit

function BadApple(){}
BadApple.prototype = new Apple

(new BadApple).constructor === Fruit   // true
Fruit.constructor === Function       // true
```
与instanceof类似，constructor只能用于检测引用对象，对基本数据类型无能为力。

与instanceof不同的是，在访问基本数据类型的属性时，JavaScript会自动调用其构造函数来生成一个对象。例如：
```JavaScript
(3).constructor === Number // true
true.constructor === Boolean // true
'abc'.constructor === String // true
// 相当于
(new Number(3)).constructor === Number
(new Boolean(true)).constructor === Boolean
(new String('abc')).constructor === String
```
这种将一个值类型转换为对象引用类型的机制在其他语言中也存在，称为`装箱`。

但在基本数据类型中，null和undefined调用constructor会抛出TypeError异常。
```JavaScript
null.constructor         // TypeError!
undefined.constructor    // TypeError!
```
因为`null`是JavaScript原型链的起点，`undefined`是无效对象，都没有构造函数，也就不存在`constructor`属性。

#### instanceof跨窗口问题
我们知道Javascript是运行在宿主环境下的，而每个宿主环境会提供一套ECMA标准的内置对象，以及宿主对象（如window, document），一个新的窗口即是一个新的宿主环境。 不同窗口下的内置对象是不同的实例，拥有不同的内存地址。

而instanceof和constructor都是通过比较两个Function是否相等来进行类型判断的。 此时显然会出问题，例如：
```javaScript
var iframe = document.createElement('iframe');
var iWindow = iframe.contentWindow;
document.body.appendChild(iframe);

iWindow.Array === Array         // false
// 相当于
iWindow.Array === window.Array  // false
```
因此iWindow中的数组arr原型链上是没有window.Array的。请看：
```JavaScript
iWindow.document.write('<script> var arr = [1, 2]</script>');
iWindow.arr instanceof Array            // false
iWindow.arr instanceof iWindow.Array    // true
```

### 使用toString方法

使用`toString`方法是最为可靠的类型检测手段，它会将当前对象类型转换为字符串并输出。 

使用`toString`属性定义在Object.prototype上，因而所有对象都拥有toString方法。但`Array`, `Date`等对象会重写从Object.prototype继承来的toString，所以最好用Object.prototype.toString来检测类型。
```JavaScript
toString = Object.prototype.toString;

toString.call(new Date);  // [object Date]
toString.call(new String);// [object String]
toString.call(Math);      // [object Math]
toString.call(3);         // [object Number]
toString.call([]);        // [object Array]
toString.call({});        // [object Object]

// Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null);      // [object Null]
```
采用`toString`也不是完美的，它无法检测用户自定义类型。因为Object.prototype是不知道用户会创造什么类型的，它只能检测ECMA标准中的那些内置类型。
```JavaScript
toString.call(new Fruit) // [object Object]
```
因为返回值是字符串，也避免了跨窗口问题。当然IE弹窗中还是有Bug，不必管它了。 现在多少人还在用IE？多少人还在用弹窗？

和Object.prototype.toString类似地，Function.prototype.toString也有类似功能，不过它的this只能是Function，其他类型（例如基本数据类型）都会抛出异常。

### 其他
有时Duck Typing的类型推断方式也非常可行，貌似已经成为了前端的惯例。比如jQuery是这样判断一个Window的：
```JavaScript
isWindow: function(obj){
    return obj && typeof obj === 'object' && "setInterval" in obj;
}
```

### 总结
`typeof`只能检测基本数据类型，对于`null`还有Bug。

`instanceof`适用于检测对象，它是基于原型链运作的。

`constructor`指向的是最初创建者，而且容易伪造，不适合做类型判断。

`toString`适用于ECMA内置JavaScript类型（包括基本数据类型和内置对象）的判断。

*引用类型* 检查都有跨窗口问题，比如instanceof和constructor。

总之，**如果你要判断的是基本数据类型或JavaScript内置对象，使用toString； 如果要判断的是自定义类型，请使用instanceof。**

> <p>进了前端门，便是一家人</p><p>原创不易,点赞、留言、分享就是大师兄写下去的动力!</p>