---
title: "Setting Up a macOS Development Environment"
pubDate: 2026-07-25
layout: ../../layouts/PostLayout.astro
description: "A step-by-step guide to building an organized, maintainable development environment on an Apple Silicon Mac."
author: "Brian Hennessy"
tags: ["developer", "macos"]
---

The first time I had set up a development environment on my Mac, I ended up piecing together a scattered setup from various course notes, documentation articles, and blog posts.

As you could imagine, this had lead to a messy and disjointed environment setup—one that would produce confusing issues, and several wasted hours spent troubleshooting annoying PATH conflicts that were difficult to understand as a beginner.

This guide serves as my attempt to document an organized, sensible installation setup—a step-by-step guide to getting a solid development environment running on macOS that is both easy to maintain and troubleshoot, while allowing flexibility as you grow and improve your skills as a developer. There are a hundred ways to do this; here's what works for me and maybe it'll help you get started too.

---

## 0. The Fundamentals Before You Start

### 0.1. Check Your Chip: Apple Silicon vs Intel

Macs produced since late 2020 use Apple Silicon chips (M1, M2, M3, etc), while older Macs used Intel-based chips. Some tools install to different locations depending the the chip inside your Mac, and being aware of this is useful to keep in mind in case you encounter and "command not found" errors later on.

This guide assumes that you are using an Apple Silicon based Mac. If you are unsure which chip you have, you can check this by clicking the  Apple logo in the top left corner of your screen >> "**About This Mac**", and you'll then see "Apple M1/M2/M3 etc" or "Intel Core" listed in the pop-up window.

### 0.2. Make sure that macOS is up to date

Before installing anything, make sure that your version of macOS is up to date. Assuming that your Mac is running on at least macOS 13 Ventura (released October 24, 2022), press ⌘ Command + Space to the **System Settings** app >> **"General"** >> **"Software Update"**. It's best to make sure that we have everything up to date to avoid any unexpected compatibility issues with the tools that we're about to install.

### 0.3. Install a Code Editor

You will want to install a code editor for writing and editing code files. **Visual Studio Code** (VS Code) has long been the go-to choice for beginners and professionals alike. **Cursor** is alternative option that is rapidly gaining popularity; it is a modified fork of Visual Studio Code with some useful AI integrations like codebase-aware chat and code generation.

- Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
- Download Cursor from [cursor.com](https://cursor.com/)

After selecting and downloading either code editor, open it and then press **⌘ Command + Shift + P** to open the Command Palette, type "shell commend", and select **Install 'code' command in PATH**. This lets you open any folder in VS Code/Cursor directly from the terminal by typing:

```bash
code .
```

This simple command will save you a lot of time.

### 0.4. Check Out The Terminal

#### What is the Terminal?

The Terminal is an application that lets you perform actions on your Mac by typing text commands. It feels intimidating and non-intuitive at first, but I promise once you get familiar with it, it'll be hard to imagine going back to the old way of clicking around with a mouse.

Most developer tools are designed to be installed and managed through the Terminal, so it is something that you will need to get comfortable with.

To open Terminal: press ⌘ Command + Space, type "Terminal", and hit Enter.

Once open, you'll see a prompt — a line ending in `$` or `%` — that's waiting for you to type a command. When you see code blocks in this guide like:

```bash
some-command --option
```

That means you should type that command into your Terminal and press Enter to run it.

#### A note on zsh vs bash

This is not something that you generally need to worry about; macOS uses **zsh** as its default shell. You may occasionally find other terminal guides referencing **bash** — an older shell that was the default before macOS Catalina. For most purposes they behave the same. If you ever need to switch between them you can run the following commands within your terminal:

```bash
 chsh -s /bin/bash # switch to bash shell

 chsh -s /bin/zsh # switch to zsh shell
```

With either of the above commands, you will need to restart the terminal in order for the change to take effect. If you are unsure which shell you are using, you can run the following command:

```bash
which $SHELL
```

---

## 1. Install Xcode Command Line Tools

Now that we have the fundamentals out of the way, it's time to start preparing preparing our development environment.

The very first thing we will need to install is Apple's **Xcode Command Line Tools**. This package gives your Mac essential compilers and build tools—things like `git` , `make`, and `clang`—that nearly every developer tool depends on.

Run this command in your terminal:

```bash
xcode-select --install
```

A dialogue box will appear asking you to install the tools. Click **Install** and wait for if to finish (it may take a few minutes). Once done, verify the install worked by entering the following into your terminal:

```bash
xcode-select -p
```

If it returns a path like `/Library/Developer/CommandLineTools`, then you're good to go.

---

## 2. Install Homebrew

**Homebrew** is a package manager for macOS—think of it as an App Store for developer tools that you install via the Terminal. It's the standard way to install and manage system packages on your Mac.

Paste the installation script from [brew.sh](https://brew.sh/) into your Terminal and run it. The installer will walk you through the process and at the end will prompt you to run a couple of commands to add Homebrew to your `$PATH` (more on what that means below). Make sure you run those commands.

Then add the following to your `~/.zshrc` file (I'll explain this file shortly):

```bash
# Add Homebrew to PATH
export PATH="/opt/homebrew/bin:$PATH"
export PATH="/opt/homebrew/sbin:$PATH"
```

> **Intel Mac Users:** Replace `/opt/homebrew` with `/usr/local` in the lines above.

Once installed, verify that it's working by entering the below command into your terminal:

```bash
brew --version
```

Run `brew doctor` to check for any issues. It'll flag anything that needs attention before you continue.

### Understanding your Shell Config File: `~/.zshrc`

You'll see references to `~/.zshrc` throughout this guide, so it's worth understanding what it is. The `~/.zshrc` file is a configuration script that runs every time you open a new Terminal window. It is where you store settings, custom commands, and most importantly; **PATH** definitions that tell your shell where to find installed tools.

The `~` is shorthand for your home directory (e.g. `/Users/yourname`). The file is hidden by default (the dot prefix means hidden in Unix), but you can open it with:

```bash
open ~/.zshrc
```

Or edit it directly in Terminal using a text editor like `nano`:

```bash
 nano ~/.zshrc
```

After making and changes to `~/.zshrc`, reload it in your current Terminal session with:

```bash
source ~/.zshrc
```

---

## 3. Install Git 

**Git** is version control software—it tracks changes to your code over time and makes developer collaboration possible. It's installed by default on macOS, but we want the Homebrew version so it stays up to date.

```bash
brew install git
```

Verify it is installed correctly:

```bash
which git
git --version
```

_To verify that when you are running `git` commands using the Homebrew version that we just installed, the `which git` command should return `/opt/homebrew/bin/git`_

### 3.1. Configure Git

You will need to tell Git who you are—these details get attached to every change that you make. Enter the following into your terminal:

```bash
git config --global user.name "Your Name"
git config --global user.email "username@users.noreply.github.com"
git config --global init.defaultBranch main
git config --global color.ui auto
git config --global pull.rebase false
```

> Using your Github no-reply email (`username@users.noreply.github.com`) keeps your personal email address off public commits.

### 3.2. Set up your Global `.gitignore`

There are many types of files that you never want to commit to a git repository, and the `.gitignore` file is a way to instruct git to automatically ignore these file types without you having to explicitly tell it each time.

For example, `.DS-Store` is a hidden file macOS creates automatically in every folder—it contains metadata for that folders specific display settings and there is no reason to commit this to a git repository.

Running the first command will add `.DS_Store` to the `~/.gitignore_global` file, and will create this file if it does not exist already. The second command instructs git to refer to this `~/.gitignore_global` file as a global ignore list for all repositories on your Mac:

```bash
echo .DS_Store >> ~/.gitignore_global

git config --global core.excludesfile ~/.gitignore_global
```

### 3.3. Connect to Github with SSH

SSH (Secure Shell) is a way for your computer to authenticate a connection to GitHub without needing to enter your password every time. Here's the short version:

**1. Generate an SSH Key Pair**

```bash
ssh-keygen -t ed25519 -C "your_email@domain.com"
```

Press Enter to accept the default file location (`~/.ssh/id_ed25519`). Optionally set a passphrase.

This will create two files in the `~/.ssh/` directory:

- `id_ed25519` — your **private** key (never share this)
- `id_ed25519.pub` — your **public** key (this is what you give to GitHub)

**2. Add the public key to Github**

Copy your public key to the clipboard:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

Then got to **GitHub → Settings → SSH and GPG keys → New SSH Key**, paste it in, and save.

**3. Test the connection:**

```bash
ssh -T git@github.com
```

You should see a message like: `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`

For the full walkthrough, see [Github's SSH documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## 4. Install a Tool Version Manager

MacOS ships with its own versions of Node, Ruby and Python already installed. **You do not want to touch the system versions.** They're used by macOS itself, and modifying them can break things in unexpected ways.

Instead, we'll install our own versions using a version manager—a tool that lets you install, switch between, and manage multiple versions of a language independently from the system installation.

### 4.1. Mise: One Tool to Serve Them All

Rather than installing a separate manager for each language, (`nvm` for Node, `rbenv` for Ruby, `pyenv` for Python), I use **[Mise](https://mise.jdx.dev/)**—a single polyglot version manager that handles all of them.

Install it via Homebrew:

```bash
brew install mise
```

Then add the following to your `~/.zshrc` to activate it:

```bash
eval "$(mise activate zsh)"
```

Reload your config: `source ~/.zshrc`

### 4.2. Install Node.js and package managers via Mise

Node.js is a Javascript runtime that lets you run JavaScript outside of a browser. It's required for modern frontend and full-stack JavaScript tooling.

Install the latest LTS (Long Term Support) version via Mise:

```bash
mise use --global node@lts
```

> Installing the _LTS_ (Long Term Support) version of Node.js typically guarantees that critical bugs will be fixed for a total of 30 months.

Verify the install:

```bash
which node
node --version

which npm
npm --version
```

`npm` (Node Package Manager) comes bundled with Node.js and is used to install JavaScript packages and libraries. It is the safest baseline package manager because every Node installation includes it.

#### Install Additional JavaScript Package Managers

A package manager version is often a part of a projects toolchain, and you will encounter projects that use alternative package managers such as pnpm and Yarn.

Install bun, pnpm and Yarn via Mise:

```bash
mise use --global pnpm@latest
mise use --global yarn@latest
mise use --global bun@latest
```

Verify:

```bash
which bun
bun --version

which pnpm
pnpm --version

which yarn
yarn --version
```

### 4.3. Install Ruby via Mise & Rails

**Ruby** is the language that Rails is built on. Install it via Mise:

```bash
mise use --global ruby@latest
```

Verify:

```bash
which ruby
ruby --version
```

**Rails** is a full-stack web framework written in Runy. Once Ruby is installed, Rails is a single command:

```bash
gem install bundler rails
```

`gem` is Ruby's built-in package manager. Verify the install with:

```bash
which rails
rails --version
```

### 4.4. Install Python via Mise

Python comes with macOS, but again—don't use the system version. Install and manage your own via Mise:

```bash
mise use --global python@latest
```

Verify:

```bash
which python
python --version
```

---

## Conclusion: Verifying Your Full Environment Setup

Run through these checks to confirm that everything installed correctly:

```bash
which brew # Homebrew
which git # Git
which node # Node.js
which npm # npm
which ruby # Ruby
which rails # Rails
which python # Python
```

Each command should return something like:

- `/opt/homebrew/bin/[binary name]`
- `/Users/yourname/.local/share/mise/installs/[binary]/[version]/bin/[binary]`

If any command returns `not found`, the most common culprit is having not yet installed the tool, or a missing PATH entry in your `~/.zshrc`. Double-check that you've installed the tool, add the relevant lines to your `~/.zshrc` file, and run `source ~/.zshrc`.

---

## Troubleshooting Common Issues

**`zsh: command not found` after installing something**
The tool wasn't added to your PATH. Open `~/.zshrc`, confirm the relevant export line is there, save, and run `source ~/.zshrc`. Then try the command again.

**Apple Silicon path issues with Homebrew**
If Homebrew commands aren't working, make sure your `.zshrc` exports reference `/opt/homebrew` (not `/usr/local`). Run `which brew` to see where it's actually installed.

**Permission errors with `gem install`**
Never use `sudo gem install`. If you're getting permission errors, it usually means you're accidentally using the system Ruby instead of the Mise-managed version. Run `which ruby` — if it points to `/usr/bin/ruby`, Mise isn't active. Check that `eval "$(mise activate zsh)"` is in your `.zshrc` and reload.

**`brew doctor` warnings**
Run `brew doctor` and read the output carefully. Most warnings include suggested fixes. It's worth resolving them before proceeding — they're usually minor path issues that are much easier to fix early than later.

---

## An Overview of the Setup

Here's a summary of the full stack and what each piece does:

| Tool       | What It Does              | Why You Need It                                 |
| ---------- | ------------------------- | ----------------------------------------------- |
| Xcode CLT  | Compilers and build tools | Required by almost everything else              |
| Homebrew   | Package manager           | Installs and manages developer tools            |
| Git        | Version control           | Tracks code changes, enables collaboration      |
| VS Code    | Code editor               | Where you write your code                       |
| Mise       | Language version manager  | Manages Node, Ruby, Python versions             |
| Node.js    | JavaScript runtime        | Runs JS outside the browser; powers build tools |
| npm / Yarn | JS package managers       | Installs JavaScript libraries                   |
| Ruby       | Programming language      | Required for Rails                              |
| Rails      | Web framework             | Full-stack framework for building web apps      |
| Python     | Programming language      | General purpose scripting and data work         |

From here, you have a solid foundation to start building. The next steps depend on what you're building — but with this stack, you're ready to start a new Rails app (`rails new myapp`), a Node project (`npm init`), or a Python script without touching anything that could break your system.

---

## Further Reading

- [The Odin Project](https://www.theodinproject.com/guides/installations) — Free, comprehensive web dev curriculum with excellent setup guides
- [GitHub SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) — Official guide for SSH setup
- [Homebrew Documentation](https://docs.brew.sh/) — Everything you can do with Homebrew
- [Mise Documentation](https://mise.jdx.dev/) — Full reference for the version manager used in this guide

---

- [Installation Guides](https://www.theodinproject.com/guides/installations)
- [Founder/Hacker Installer](https://install.founderhacker.com/steps/choose_os)
- [Introduction · macOS Setup Guide](https://sourabhbajaj.com/mac-setup/)
- [Beginner's Guide to Installing Ruby on Rails - by Typecraft](https://www.youtube.com/watch?v=oEDkhfsFMTg&list=PLHFP2OPUpCeZcPutT9yn4-e0bMmrn5Gd1&index=1)
