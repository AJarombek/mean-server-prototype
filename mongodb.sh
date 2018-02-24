#!/usr/bin/env bash

# Install mongodb on macOS using homebrew
brew install mongodb

brew services start mongodb

mongodb

#Inside the mongodb shell
use meowcat