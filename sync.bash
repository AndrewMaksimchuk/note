#!/usr/bin/env bash

# Use in case when app work on different machines in same time
#
# $2 - optional parameter --continue | -c
# Use --continue after resolve git merge/rebase conflict

set -e

projectdir=$(dirname $0)
file_sync_state=".sync"

function sync_get_step {
  local sync_file_content=$(cat "$projectdir/$file_sync_state")
  sync_step=$(("$sync_file_content" + 1))
}

function sync_save_step {
  echo "$1" > "$projectdir/$file_sync_state"
}

function git_push {
  echo "[ Push to remote repository ]"
  git push origin main
}

function git_commit_conflict_resolve {
  if [[ $isConflict ]]; then
    git add .
    git commit -m "Resolve conflict"
    isConflict=""
  fi
}

function git_conflict_check {
  isConflict=$(echo "$std_git_apply" | grep --no-ignore-case 'CONFLICT')

  if [[ $isConflict ]]; then
    echo '[ git ] Resolve conflict. then write command: note sync --continue'
    exit
  fi
}

function git_pull_remote_repository {
  echo '[ git ] Pull remote repository'
  std_git_apply=$(cd $projectdir && git pull --rebase=true origin main)
}

function step_1 {
  sync_save_step 1 
  echo '[ git ] Worktree have some changes, maybe need resolve conflicts'
  echo '[ git ] Use stash to save changes'

  echo '[ git ] Stash content files'
  $(cd projectdir && git stash push --include-untracked --message 'content' -- ./content)

  echo '[ git ] Stash application files'
  $(cd projectdir && git stash push --include-untracked --message 'application')

  git_pull_remote_repository
  git_conflict_check
}

function step_2 {
  sync_save_step 2
  git_commit_conflict_resolve

  echo '[ git ] Stash apply application files'
  std_git_apply=$(cd projectdir && git stash apply 0)

  git_conflict_check
}

function step_3 {
  sync_save_step 3
  git_commit_conflict_resolve

  echo '[ git ] Stash apply content files'
  std_git_apply=$(cd projectdir && git stash apply 1)

  git_conflict_check
}

function step_4 {
  sync_save_step 4
  git_commit_conflict_resolve
  $(cd projectdir && git stash clear)
  git_push
}

function execute_steps {
  step_1
  step_2
  step_3
  step_4
}

function sync_continue {
  echo "[ command ] Continue execute 'sync' command after resolve conflict"
  isConflict="CONFLICT"

  case "$sync_step" in
    1)
      execute_steps
    ;;

    2)
      step_2
      step_3
      step_4
    ;;

    3)
      step_3
      step_4
    ;;

    4)
      step_4
    ;;

    *) echo '[ command ] Nothing to do'
    ;;
  esac
}

function sync_main {
  status=$(git status -s | wc -l)

  if [[ $status -eq 0 ]]; then
    git_pull_remote_repository
    exit
  fi

  execute_steps
}

if [[ "$2" = "--continue" ]]; then
  sync_continue
else
  sync_main 
fi

