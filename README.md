# Simple To-do

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

# select a task or input the id of task to complete
st done [task_id]

# select a task or input the id of task to delete 
st del [task_id]
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

### Todo

- 完成任务
- 重复添加相同的任务项时，提示重复
- 记录添加任务的时间戳

## Licence

MIT (please give me a star ✨)
