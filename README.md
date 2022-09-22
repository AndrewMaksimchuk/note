- terminal/bash/linux:  
    Change directory and show all files(.zshrc)  
    ```
    function cdls() { cd "$1" && echo "\\033[94m-> Directory contain: \033[0m" && ls; }
    alias cd="cdls"
    ```

- git  
    ```git log master..dev --oneline``` - Show logs between 'master' and 'dev' branches.

- terminal/bash/linux:  
    With tmux we can create multiple screen from script by send commands to tmux.  
    Example used in Makefile:
    ```
    session_name="inside_app"
    panel_server=0
    panel_active=1
    panel_git=2
    
    server_dev:
        tmux new-session -d -s $(session_name)
        tmux split-window -h
        tmux send-keys -t $(panel_server) "cd inside/ && npm run dev" Enter
        tmux select-pane -t $(panel_active)
        tmux split-window -v
        tmux send-keys "git status" Enter
        tmux select-pane -t $(panel_active)
        tmux attach-session -t $(session_name)
    ```

- js:  
    Save text as file from browser:  
    ```
    <a download="index.txt">Download file</a>
    
    const text = "Some text"
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    a.href = URL.createObjectURL(blob)
    ```
    When click on link, file "index.txt" will be saved

- css:  
    .button.is-text,  
    .button.is-text.is-hovered,  
    .button.is-text:hover,  
    .button.is-text[disabled]  

- css:  
    Use :empty to Hide Empty HTML Elements  
    ```
    :empty {
      display: none;
    }
    ```
    
- css:  
    Use rem for Global Sizing; Use em for Local Sizing

- css:  
    Tables can be a pain to work with. Try using table-layout: fixed to keep cells at equal width:
    ```
    .calendar {
        table-layout: fixed;
    }
    ```

- css:
    You can check if a font is installed locally before fetching it remotely, which is a good performance tip, too.  
    ```
    @font-face {
    font-family: "Dank Mono";
    src:
        /* Full name */
        local("Dank Mono"),
        /* Postscript name */
        local("Dank Mono"),
        /* Otherwise, download it! */
        url("//...a.server/fonts/DankMono.woff");
    }

    code {
      font-family: "Dank Mono", system-ui-monospace;
    }
    ```

- css:  
    ```
    html {
        font-size: calc(0.3vw + 0.7em);
    }
    ```

- css:  
    button.mono:focus:after,  
    button.mono:active:after,  
    details[open].mono,  
    input[type="checkbox"].mono,  
    input[type="checkbox"].mono:before,  
    input[type="checkbox"].mono:checked:before,  
    input[type="checkbox"].mono:focus:after,  

- css:  
    ```
    body.mono-class {}  
    ^        ^  
    |        |  
    html_tag |  
             class_name  
    ```

- terminal/bash/linux:  
     *gsettings* - програма налаштування середовища та інших програм через термінал.  
     ```gsettings list-recursively``` - відобразить всі доступні схеми для налаштування.  
     ```gsettings get gsettings get org.gnome.shell.extensions.dash-to-dock background-color``` - отримати значення ключа *background-color* розширення *dash-to-dock*  

- terminal/bash/unix:  
     0 — STDIN  
     1 — STDOUT  
     2 — STDERR  
     
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
    
