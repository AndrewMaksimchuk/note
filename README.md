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
    