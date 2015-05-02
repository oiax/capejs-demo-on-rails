# Cape.JS DEMO on Rails

![Cape.JS logo](https://cdn.rawgit.com/oiax/capejs/logo1/doc/logo/capejs.svg)

This is a simple demo app for [Cape.JS](https://github.com/oiax/capejs) built
on the [Ruby on Rails](http://rubyonrails.org/).

Visit [Cape.JS Documentation](http://oiax.github.io/capejs/) to learn about Cape.JS in general.

## Prerequisites

In order to run this demo application, you need following softwares and libraries:

* [Git](http://git-scm.com/)
* [Ruby](https://www.ruby-lang.org/en/) 2.0 or higher
* [Bundler](http://bundler.io/)
* [Node.js](https://nodejs.org/) or [io.js](https://iojs.org/en/index.html)
* [Bower](http://bower.io/)

## Installation of this demo application

```
$ git clone https://github.com/oiax/capejs-demo-on-rails.git
$ cd capejs-demo-on-rails
$ bundle
$ bower install
$ bin/rake db:setup
```

## How to start and stop this demo application

To start the application, run this command on your terminal:

```
$ bin/rails s
```

Then, you can access it using a web browser.

Enter `Ctrl-C` to stop it.
