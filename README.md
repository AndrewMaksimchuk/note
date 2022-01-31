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
    
