# Simple To-do

![build passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)

🛠 A simple command line To-do list tool.

## Installation

Using `npm`:

```shell
npm install -g simple-toto
```

Using `yarn`:

```shell
yarn global add simple-toto
```

## Usage

After installation, you can use `st` as a global command.

### Task

```shell
# add a task
st

# list tasks under TODO status
st ls

# list all tasks with detail information
st ls -av

# enter the id of task to complete
st done <task_id>

# enter the id of task to delete
st del <task_id>
```

### Tag

```shell
# list all tags
st tag

# add a tag
st tag <tag_name>

# edit a tag
st tag -e <tag_name>

# delete a tag
st tag del <tag_name>
```

## Licence

MIT (please give me a star ✨)
