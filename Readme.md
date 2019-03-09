# loggerwhale
Simple logger supporting output patterns, text formatting, message severity levels, etc.
## Installation
**npm**

     npm install loggerwhale

**yarn**

    yarn add loggerwhale

## Usage
**Example**

    const log = require('loggerwhale');

    // Configuring the logger configuration
    // This will change the template property that is responsible for the output template
    log.config = {
    	template: '%rfp > %t',
    };

    // Display text to the console
    log('Also, Powell and Donovan find food, but it\'s all baked beans and milk.');
**Output**

    folder\file.js > Also, Powell and Donovan find food, but it's all baked beans and milk.

## Table of contents
 - [Properties](#properties)
	 - [log.config](#log.config)
	 - [log.defaultConfig](#log.defaultconfig)
 - [Methods](#methods)
	 - [log](#log)
	 - [log.log](#log.log)
	 - [log.info](#log.info)
	 - [log.warn](#log.warn)
	 - [log.error](#log.error)
	 - [log.success](#log.success)
	 - [log.done](#log.done)
	 - [log.resetCounter](#log.resetcounter)
	 - [log.addPreset](#log.addpreset)
 - [Output template](#output-template)
 - [Output styles](#output-styles)

## Properties

### log.config
**log.config** - configuration for your log.
Has four possible properties:

**template** - String. Template for future conclusions. Read more.
**minLevel** - Number or function. Minimum required output level.
**maxLevel** - Number or function. Maximum required output level.
**timeFormat** - The format of the output time in the moment format. [Read more](https://momentjs.com/docs/#/displaying/format/).

**Example**

    log.config = {
    	template: '[%ft] %t',
    	minLevel: 6,
    	maxLevel: 11,
    	timeFormat: 'H:mm:ss',
    };

    // Logging
    log('So Lanning calls Calvin in and they call Byerley.', 5);
    log('And Quinn doesn\'t like Stephen Byerley.', 11);
    log('So Byerley does hit him.', 12);

**Output**

    [9:02:45] And Quinn doesn't like Stephen Byerley.

### log.defaultConfig
 **log.defaultConfig** - The standard configuration that will be used for new loggerwhale connections in other files.
Changes to log.defaultConfig immediately apply to the usual log.config and accepts the same properties as it does.

**Example**

**file.js:**

    const log = require('loggerwhale');
    log.defaultConfig = {
      	template: 'Question from %ffn: %t',
    };
    require('./anotherFile.js');

    log('Or would that break the First Law?');

**anotherFile.js**

    const log = require('loggerwhale');

    log('Could a robot do that?');
**Output**

    Question from anotherFile.js: Could a robot do that?
    Question from test.js: Or would that break the First Law?

## Methods

### log
**log** -   main function that loggerwhale exports.
Has 3 arguments: the text of the log, it's level and the styles string. None of this is necessary. Returns itself, which allows you to make chains.  Standard level - 0.

**Example**

    log.config = {
	   	template: '[%l] %t'
    };

    // This message is displayed with cyan  background and black text.
    log('It\'s 2032.', 42, 'bgCyanBright black');
**Output**

    [42] It's 2032.

### log.log
**log.log** - Same as regular log. It is necessary for convenience of creation of chains.

**Example**

    log('Three Laws of Robotics:');

    log.config = {
    	template: '%c. %t',
    };

    log
    	.log('A robot may not injure a human being or, through inaction, allow a human being to come to harm.')
    	.log('A robot must obey the orders given it by human beings except where such orders would conflict with the First Law')
    	.log('A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws.');
**Output**

    Three Laws of Robotics:
    1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
    2. A robot must obey the orders given it by human beings except where such orders would conflict with the First Law
    3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws.

### log.info
**log.info** - preset with a ready set of styles.
Displays the text in blue. Standard level - 0.
Has the same arguments as the normal log.

**Example**

    // This message is displayed in blue
    log.info('We have no idea what that means, but it sounds good.');
### log.warn
**log.warn** - preset with a ready set of styles.
Displays the yellow text with an underscore. Standard level - 1.
Has the same arguments as the normal log.

**Example**

    //This message is displayed in yellow and with an underscore
    log.warn('So Lanning calls Calvin in and they call Byerley.');
### log.error
**log.error** - preset with a ready set of styles.
Displays the text in red. Standard level - 2.
Has the same arguments as the normal log.

**Example**

    //This message is displayed in red
    log.error('So Byerley does hit him.');
## log.success
**log.success** - preset with a ready set of styles.
Displays the text in bright green. Standard level - 2.
Has the same arguments as the normal log.

**Example**

    //This message is displayed in red
    log.info('But we don't get to hear the plan.');
### log.done

**log.done** - preset with a ready set of styles.
Displays the text in  green. Standard level - 3.
Has the same arguments as the normal log.

**Example**

    //This message is displayed in red
    log.done('That's the way this story ends — without any real evidence.');

### log.resetCounter
**log.resetCounter** -a  function that resets the internal counter value for the %c tag. Accepts one optional argument from which the counter will start counting.

**Example**

    log.config = {
    	template: 'Meanwhile, it was 196%c.',
    };

    log()
    log()
    log()

    log.resetCounter(7);

    log()
    log()
    log()
**Output**

    Meanwhile, it was 1960
    Meanwhile, it was 1961
    Meanwhile, it was 1962
    Meanwhile, it was 1967
    Meanwhile, it was 1968
    Meanwhile, it was 1969

### log.addPreset
**log.addPreset** - The method that will give its preset a similarity to log.info and log.error. It takes 3 arguments: it has a mark, a standard level and itэs styles.

**Example**

    log.addPreset('note', 1, 'inverse');

    // Displays text with white background and black text
    log.note('A towel is perhaps the most necessary item!');

## Output template
The template property specifie inside the log.config  object and represents the log output template. At each call to the loggerwhale, replace the special template tags with their properties.

**Template tags**
**%%** - outputs a literal "%"
**%t** - outputs the text of the log
**%afp** - outputs the absolute path to the file

    C:\applications\greatesApp\app.js

**%rfp** - outputs the relative  path to the file

    router\index.js

**%ft** - the date formatted using the [moment](https://www.npmjs.com/package/moment)

    5/17/18 12:34:56 AM

**%st** - outputs the number of milliseconds passed from the start of the application
**%llt** - outputs the number of milliseconds passed since the last log
**%ffn** - outputs full file name

    master.min.js

**%sfn** - outputs simplified file name

    master

**%l** - outputs the level of log
**%c** - outputs displays the current value of the counter

**Example**

    log.config = {
    	template: 'from %rfp at %ft > %t',
    };

    log('First, Byerley went to the Eastern Region.');
**Output**

    from tests\template.js at 3/17/07 5:12:36:322 PM > First, Byerley went to the Eastern Region.

## Output styles
A string of style names that is passed by the third argument to the log function. Loggerwhale stylizes logs with [chalk](https://www.npmjs.com/package/chalk) and style names are the same as. [Read more](logger%20whale%20stylizes%20logs%20with%20chalk%20and%20style%20names%20are%20the%20same%20as.).

**Example**

    // Displays text with bright yellow background
    log('If you can believe it, that\'s how the story ends.', 0, 'yellowBright');

    // Displays invisible text
    log('I will see no more.', 0, 'hidden');

    // Displays text with strikethrough (not widely supported)
    log('My life is over.', 0, 'strikethrough');
