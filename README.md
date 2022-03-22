- terminal/bash/unix:  
     ? - Single character wildcard ```ls badge?.txt``` ```ls ?????.txt```  
     \* - Character sequence wildcard ```ls source.*``` ```ls badge*```  
     [] - Character set wildcard ```ls badge_0[246].txt``` ```ls badge_[01][789].txt``` ```ls badge_[23][1-5].txt```  
     & - Background process (launch an application as a background process and continue to use the terminal window)  
     ```gedit command_address.page &```  
     < - Input redirection ```sort < words.txt```  
     \> - Output redirection ```ls > files.txt```  
     $ - Variable expressions ```echo $PATH```  

- terminal/bash/unix:
     Redirect one terminal command output to another terminal window input.  
     ```$ tty => /dev/pts/0``` - check what terminal is reciever  
     ```exec 1>/dev/pts/1``` - redirect to /dev/pts/1 terminal  
     ```exec 1>/dev/pts/0``` - restore default behavior

- code:   
     ```
     function getFullName({ firstName, lastName }) {
       return `${firstName} ${lastName}`;
     }
     ```
- js:   
     To convert an iterable object to an array, use spreads ... instead of Array.from.   
     ```
     const nodes = [...foo];
     ```   
- js:   
     The console.assert() methods writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.   
     ```
     console.assert(4 > 3, '4 is greater than 3'); // no result
     console.assert(3 > 4, '3 is not greater than 4'); // Assertion failed: 3 is not greater than 4
     console.assert(i % 2 === 0, { number: i, errorMessage: errorMessage });
     ```

- js:   
     ```
     console.log('%d %s of JavaScript', 30, 'Days');
     
     console.log('%c30 Days Of JavaScript', 'color:green');
     console.log(
       '%c30 Days%c %cOf%c %cJavaScript%c',
       'color:green',
       '',
       'color:red',
       '',
       'color:yellow'
     );
     ```

- js:   
     Зміна або заміна об’єкта під час копіювання   
     ```
     const user = {
       name:'Asabeneh',
       title:'Programmer',
       country:'Finland',
       city:'Helsinki'
     }   
     const copiedUser = {...user, title:'instructor'}
     console.log(copiedUser)
     ```

- js:   
     Якщо довжина рядка занадто велика, вона не поміщається в один рядок,   
    ми можемо використовувати символ зворотної косої риски (\) в кінці кожного рядка,    
    щоб вказати, що рядок продовжиться в наступному рядку.   
    ```
    const paragraph = "My name is Asabeneh Yetayeh. I live in Finland, Helsinki.\
    I am a teacher and I love teaching. I teach HTML, CSS, JavaScript, React, Redux, \
    Node.js, Python, Data Analysis and D3.js for anyone who is interested to learn. \
    ```

- common:   
    Щоб відобразити unicode символи у терміналі або консолі,    
    необхідно вказувати код символа, наприклад: `process.stdout.write("\u2654")`   

- common:   
    Unicode:
    - [alt-codes](https://unicode-table.com/en/alt-codes/)   
    - [box drawing](https://unicode-table.com/en/blocks/box-drawing/)
    - [chess symbols](https://unicode-table.com/en/sets/chess-symbols/)

- css:
    ```clip-path``` - створює обмежену область, що визначає яка частина елемента має бути видима.   
    Та частина елемента що знаходиться всередині області, будуть видимі.   
    ```   
        // Image values
        clip-path: url(resources.svg#c1);

        // Box values
        clip-path: fill-box;
        clip-path: stroke-box;
        clip-path: view-box;
        clip-path: margin-box;
        clip-path: border-box;
        clip-path: padding-box;
        clip-path: content-box;

        // Geometry values
        clip-path: inset(100px 50px);
        clip-path: circle(50px at 0 100px);
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

        // Box and geometry values combined
        clip-path: padding-box circle(50px at 0 100px);
    ```

- css:   
    ```max-content``` - ключове слово що представляє власну максимальну або ширину або висоту контента(вмісту).   
    ```
    /* Used as a length */
    width: max-content;
    inline-size: max-content;
    height: max-content;
    block-size: max-content;

    /* used in grid tracks */
    grid-template-columns: 200px 1fr max-content;
    ```

- c:   
    Графіка та керування у вікні термінала   
    Using ANSI escape sequence, where ESC[y;xH moves curser to row y, col x:
    ```
    #include <stdio.h>
    int main()
    {
        printf("\033[6;3HHello\n");
        return 0;
    }
    ```   
    urls:   
        - https://en.wikipedia.org/wiki/ANSI_escape_code - керування у вікні терміналі   
        - https://en.wikipedia.org/wiki/ANSI_escape_code#CSIsection - опис команд що відповідають за переміщення курсора по екрані   
        - https://en.wikipedia.org/wiki/ANSI.SYS   

- css:   
    :is() - псевдо-клас що приймає список елементів(точніше їх селектори) та застосовує до всіх них задані стилі.   
    Корисно використовувати для вложеності елементів.   
    ```
    /* Selects any paragraph inside a header, main
       or footer element that is being hovered */
    :is(header, main, footer) p:hover {
      color: red;
      cursor: pointer;
    }
    ```   

    :not() - псевдо-клас що приймає список елементів і представляє всі елементи що не знаходяться у переданому як аргумент списку елементів.   
    ```
    /* Selects any element that is NOT a paragraph */
    :not(p) {
      color: blue;
    }
    ```   

- typescript:   
    ```type MergeStringsArray = [string, string, ...string[]];```   
    ```type ProductCode = number | string``` - unions   
    ```type ApiGetUserResponse = StatusResponse & GetUserResponse;``` - intersection type, ```ApiGetUserResponse``` матиме всі властивості із обох типів   
    ```type StringThatStartsWithGet = `get${string}`;   
       const myString: StringThatStartsWithGet = 'getAbc';``` - template strings type   
    ``` const valueB = valueA as string; ``` - type assertions, ```as``` використовується щоб явно вказати тип або змінити тип на необхідний(переназначити)   
    ```Array<T>``` - generic type   
    ```function sum(...args: number[]) {}```   
    

- typescript:   
    indexable types - таким чином можна створювати обєкт з необмеженою кількістю властивостей які будуть слідувати вказаній сигнатурі.  
    ```[key: тип ключа]: тип значення що зберігатиметься під цим ключем``` 
   ```
   type Data = {
    [key: string]: any;
   };
   ```

- Існує спосіб стерти текст, що вже виведений на екран терміналу, але це відноситься тільки до останнього рядка.  
    Як тільки ви вивели на екран символ нового рядка(```\n```), ви більше не в змозі видалити раніше показаний текст.  
    Щоб видалити текст, виведіть керуючий символ ```\b```. Цей керуючий символ видаляє останній відображений символ на екрані.  
    
    Для node.js потрібно використовувати ```procces.stdout.write(текст_для_відображення)```.  
    Це потрібно тому що ```console.log()``` додає в кінець тексту керуючий символ нового рядка(```\n```), що нам зовсім не потрібно.  
    ```process.stdout.write("hello");``` вірно :heavy_check_mark:   
    ```console.log("hello");``` хибно :heavy_multiplication_x:   
    
    
    Якщо хочете переписати останній рядок, можна додати керуючий символ повернення каретки ```\r```, приклад:
    ```
    let dots = ''
    process.stdout.write(`Loading `)

    let tmrID = setInterval(() => {
      dots += '.'
      process.stdout.write(`\rLoading ${dots}`)
    }, 1000)

    setTimeout(() => {
      clearInterval(tmrID)
      console.log(`\rLoaded in [3500 ms]`)
    }, 3500)
    ```
    Таким чином можна створювати анімацію завантаження.
    
