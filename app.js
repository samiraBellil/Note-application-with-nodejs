const fs = require('fs')

switch (process.argv[2]) {
    case 'add':
        add()
        break;
    case 'read':
        read()
        break;
    case 'remove':
        remove()
        break;
    case 'list':
        list()
        break;
    default:
        help();
}



function add(){
    let newTodo = {}

    let indexTitle = process.argv.findIndex(el => el === "--title")
    if(indexTitle === -1 || process.argv[indexTitle+1] === undefined){
        console.log('Options:\n --help \t\t\t Show Help')
        console.log('--title \t\t\t Title of Note')
        console.log('--body \t\t\t Body of Note')
        return
    }else{
        newTodo.Title = process.argv[indexTitle + 1]
    }
    let indexBody = process.argv.findIndex(el => el === "--body")
    if(indexBody === -1 || process.argv[indexBody+1] === undefined){
        console.log('Options:\n --help \t\t\t Show Help')
        console.log('--title \t\t\t Title of Note')
        console.log('--body \t\t\t Body of Note')
        return
    }else{
        newTodo.Body = process.argv[indexBody + 1]
    }
    let todos = JSON.stringify(JSON.parse(fs.readFileSync('todos.json').toString()).concat(newTodo))
    fs.writeFileSync('todos.json', todos)

    console.log('Note Created\n -- \n Title: ' + newTodo.Title + '\n Body: ' + newTodo.Body)
}


function list(){
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    console.log(`Printing ${todos.length} note(s)`)

    todos.forEach(todo => {
        console.log(`\n Title: ${todo.Title} \n Body: ${todo.Body}`)
    });
}


function read(){
    let title = ''
    let indexTitle = process.argv.findIndex(el => el === "--title")
    if(indexTitle === -1 || process.argv[indexTitle+1] === undefined){
        console.log('Options:\n --help \t\t\t Show Help')
        console.log('--title \t\t\t Title of Note')
        return
    }else{
        title = process.argv[indexTitle + 1]
        let todos = JSON.parse(fs.readFileSync('todos.json').toString())
        let todo = todos.filter(el => el.Title === title)
        if(todo.length === 0){
            console.log('Todo Not Found')
            return
        }else{
            console.log('Note Fond:\n')
            console.log(`Title: ${todo[0].Title} \n Body: ${todo[0].Body}`)
        }
    }
}


function help(){
    console.log('add --title value --body value \t\t\t\t\t to add new note')
    console.log('remove --title value \t\t\t\t\t to remove a note')
    console.log('read --title value \t\t\t\t\t to read a note')
    console.log('list  \t\t\t\t\t to list notes')
}
function remove(){
    let Title =''
    let indexTitle = process.argv.findIndex(el => el === "--title")
    if(indexTitle === -1 || process.argv[indexTitle+1] === undefined){
        console.log('Options:\n --help \t\t\t Show Help')
        console.log('--title \t\t\t Title of Note')
        return
    }
    else{
        Title = process.argv[indexTitle+1]
       
        let todos = JSON.parse(fs.readFileSync('todos.json').toString())
        let newList = JSON.stringify(todos.filter(el => el.Title !== Title))
        fs.writeFileSync('todos.json', newList)
        console.log('Note was removed')

    }
   
}