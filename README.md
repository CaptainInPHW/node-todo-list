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
st l
# list all tasks with detail information
st l -av
# select a task to delete 
st d
```

### Tag

```shell
# list all tags
st t
# add a tag
st t <tag_name>
# edit a tag
st t -e <tag_name>
# delete a tag
st d t <tag_name>
```

### Group

```shell
# list all groups
st g
# add a group
st g <group_name>
# edit a group
st g -e <group_name>
# delete a group
st d g <group_name>
```

### Todo

- 完成任务
- 重复添加相同的任务项时，提示重复
- 记录添加任务的时间戳

## Licence

MIT (please give me a star ✨)
