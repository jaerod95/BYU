/*   STILL LEFT TO DO 
Make an option just to upload a page and not put it to a module
Fix off by one error.
Add refresh functionality.
Fix GUI (loading animation, draggable, etc.)*/
/* global jQuery, $ */


////////////////////////////////////////////
/////MAIN FUNCTION FOR CONVERSION
////////////////////////////////////////////

var FileScraper = {

        ////////////////////////////////////
        //////DECLARATION OF VARIABLES//////
        ////////////////////////////////////

        //f will be defined at runtime as the single file being worked on
        f: null,

        //iterator to tell where in all the files we currently are
        loc: 0,

        //files will be defined at run time as the array of files
        files: null,

        //This will be where the file data will be stored
        output: "",

        //Authorization for Canvas
        oAuth: '7407~H0b3RHGsKKZr6TMdG3FabHxgnEJ0MSY9Eg7KP4rvTWm3li9BwVamEl9yvrLELwU2',

        //Array where we will store all the arrays of file information
        pages: [],

        //The module ID for each module to upload the files
        id: 0,

        //The current File array of data getting uploaded
        pageIndex: 0,

        //If an error is found in a file, this will become true,
        //causing a confirmation window to appear
        err: false,

        // the current webpage that the window is on
        currentURL: window.location.href,

        // the current course to upload files to
        courseNumber: "",
        
        ////////////////////////////////////
        ////END DECLARATION OF VARIABLES////
        ////////////////////////////////////




        ////////////////////////////////////
        ////////START INIT FUNCTIONS////////
        ////////////////////////////////////


        //Appends the toggle button for the filereader///
        //adds the html elements of the file filereader//
        /////////////////////////////////////////////////
        
        init: function() {
            var that = FileScraper
            if (that.verifyContext()) {
                $('#application').append('<button id="jr_toggle_c_uploader" onclick="FileScraper.jr_fr_toggle()"><p>Toggle Content Page Uploader</p></button><div id="jr_c_uploader"><h1>Content Page Creator</h1><h2>Select Content Files:</h2><input type="file" id="files" name="files[]" multiple /><label for="files" id="jr_c_file">Choose a file</label><p>Errors found with the following files:<ul id="jr_c_list"></ul></p><button id="jr_c_no" onclick="FileScraper.resetIt()">Cancel</button><div id="jr_c_loader"></div></div>')
                document.getElementById('files').addEventListener('change', FileScraper.init_scraper, false)
                document.getElementById('files').addEventListener('change', FileScraper.loadIt, false)
                $('#jr_c_uploader').draggable({ handle: 'h1' });
            }
        },

        //Checks to make sure the current page URL is on the 'modules' page//
        /////////////////////////////////////////////////////////////////////
        
        verifyContext: function() {

            this.currentURL = (this.currentURL.includes('c9users.io')) ? 'https://byu.instructure.com/api/v1/courses/365/modules' : this.currentURL;
            var isModulesPage = (this.currentURL.includes("/modules")) && (!/\/modules\/\S+/.test(this.currentURL));

            if (isModulesPage) {

                this.currentURLSplit = this.currentURL.split('/');

                for (var i = 0; i < this.currentURLSplit.length; i++) {
                    var isThreeDigitNum = /^\d{3,}/.test(this.currentURLSplit[i]);

                    if ((!this.courseNumber) && (isThreeDigitNum)) {
                        this.courseNumber = this.currentURLSplit[i];
                    }
                }
            }
            return isModulesPage;
        },

        //Gathers all the file information at places it in the files variable//
        ///////////////////////////////////////////////////////////////////////
        init_scraper: function(evt) {
            var that = FileScraper
            that.files = evt.target.files
            that.handleFileSelect()
        },

        ////////////////////////////////////
        /////////END INIT FUNCTIONS/////////
        ////////////////////////////////////


        ////////////////////////////////////
        ////////START SIDE FUNCTIONS////////
        ////////////////////////////////////

        //Begins the loading animation
        loadIt: function() {
            $('#jr_c_loader').css('opacity', 1)
        },

        //Toggles the FileReader Application from showing
        jr_fr_toggle: function() {
            if ($('#jr_c_uploader').css('opacity') == 0) {
                $('#jr_c_uploader').css('opacity', 1)
            }
            else {
                $('#jr_c_uploader').css('opacity', 0)
            }
        },

        //RESETS FILESCRAPER TO DEFAULT VALUES
        resetIt: function() {
            this.f = null
            this.loc = 0
            this.files = null
            this.output = ""
            this.pages = []
            this.id = 0
            this.pageIndex = 0
            this.err = false
            $('#jr_c_yes').css('opacity', 0)
            $('#jr_c_no').css('opacity', 0)
            $('#jr_c_list').empty()
        },

        ////////////////////////////////////
        /////////END SIDE FUNCTIONS/////////
        ////////////////////////////////////            

        ///////////////////////////////////////////////
        //////////////CONTENT FUNCTIONS////////////////
        ///////////////////////////////////////////////

        //Returns the title portion of the string file
        getTitle: function(str) {
            var splits = str.split('<!-- InstanceBeginEditable name="MainContent" -->')[1]
            var content = splits.split('<!-- InstanceEndEditable -->')[0]
            var title = content.split('>')[1]
            title = title.split('<')[0]
            return title
        },

        //Returns the content portion of the string file
        getContent: function(str) {
            var splits = str.split('<!-- InstanceBeginEditable name="MainContent" -->')[1]
            var content = splits.split('<!-- InstanceEndEditable -->')[0]
            content = content.replace('>', "").replace('>', '@@@!!!@@@')
            content = content.split('@@@!!!@@@')[1]
            return content
        },

        //Validates the title to see if it is a real value
        //Real values are alpha-numeric combinations
        validateTitle: function(title) {
            title = title.replace(/&[^\s]*;/g, "")
            return /[a-z]|[0-9]/i.test(title);
        },

        //Gets title and places it in the array pages
        getTitleAndContent: function(str) {
            try {
                var title = this.getTitle(str)
                if (!this.validateTitle(title))
                    throw "no!" //Throws an exception at the locationg in the files array
                var content = this.getContent(str)
                var tempArray = new Array(this.f.name)
                tempArray.push(new Array(title, content))
                this.pages.push(tempArray)
            }
            catch (e) {
                this.err = true;
                console.log("Error: found an error with the file \"" + this.f.name + "\"")
                $('#jr_c_list').append("<li>" + this.f.name + "</li>")
                if (this.loc + 1 < this.files.length) {
                    this.loc++
                        this.handleFileSelect()
                }
                else {
                    this.confirmIt()
                }
            }

            if (this.loc + 1 < this.files.length) {
                this.loc++
                    this.handleFileSelect()
            }
            else {
                this.confirmIt()
            }
        },

        //If errors in the uploaded files are found, then confirmation button
        //appears before proceeding
        
        confirmIt: function() {
            console.log(this.pages)
            if (this.err) {
                $('#jr_c_loader').css('opacity', 0)
                //$('#jr_c_errorMesage').css('opacity', 1)
                $('#jr_c_yes').css('opacity', 0)
                $('#jr_c_no').css('opacity', 1)
            }
            else {
                this.uploadToCanvas()
            }
        },

        //Goes over the input files, scrapes teh needed info, and starts
        //process to add files to file array
        handleFileSelect: function() {
            var that = FileScraper
                // files is a FileList of File objects. List some properties.

            that.f = that.files[that.loc]
            console.log(that.f)
            console.log(that.files)
                /*that.output = '<li><strong>' + that.f.name + '</strong> (' + (that.f.type || 'n/a') + ') - ' + that.f.size + ' bytes, last modified: ' + (that.f.lastModifiedDate.toLocaleDateString() || 'n/a') + '</li>'
                //$('#jr_c_list').append(FileScraper.output)*/
            var reader = new FileReader();

            // Loads the HTML Page content into a reader
            reader.readAsText(that.f);
            reader.onload = function() {
                var str = reader.result
                that.getTitleAndContent(str)
            }
        },

        //uploads the content pages to the canvas course
        uploadToCanvas: function() {
            if (this.pages.length != 0) {
                $('#jr_c_loader').css('opacity', 1)
                $('#jr_c_errorMesage').css('opacity', 0)
                this.initCreation()
            }
            else {
                alert("Please select at least one File.")
                this.resetIt()
            }
        },
        
        //Calls the ajax functions that convert the course over to Canvas
        initCreation: function() {
            var that = FileScraper
            var currentModule = that.pages[0][0].split('_')[0]
            currentModule = currentModule.replace(/\D+/, '')
            that.createModule('Introduction')
            var id_cachedValue = that.id

            function doStuff() {
                if (that.id === id_cachedValue) { //we want it to match
                    setTimeout(doStuff, 50) //wait 50 millisecnds then recheck
                    return;
                }
                id_cachedValue = that.id
                if (that.pageIndex < that.pages.length) {
                    var temp = that.pages[that.pageIndex][0].split('_')[0]
                    temp = temp.replace(/\D+/g, '')
                    if (temp === currentModule) {
                        that.pages[that.pageIndex][1].push(currentModule)
                        that.createPage(that.pages[that.pageIndex], that.id)
                    }
                    else {
                        that.detectModules2()
                    }
                }
                else {
                    $('#jr_c_loader').css('opacity', 0)
                }
            }
            doStuff();
        },

        //Helper function to check if the module changes
        detectModules: function() {
            var that = FileScraper
            var currentModule = that.pages[that.pageIndex - 1][0].split('_')[0]
            currentModule = currentModule.replace(/\D+/, '')
            if (that.pageIndex < that.pages.length) {
                var temp = that.pages[that.pageIndex][0].split('_')[0]
                temp = temp.replace(/\D+/g, '')
                if (temp === currentModule) {
                    that.pages[that.pageIndex][1].push(currentModule)
                    that.createPage(that.pages[that.pageIndex], that.id)
                }
                else {
                    that.detectModules2()
                }
            }
            else {
                $('#jr_c_loader').css('opacity', 0)
            }
        },

        //if module pages changes, calls this function to creat a new module.
        detectModules2: function() {
            var that = FileScraper
            var currentModule = that.pages[that.pageIndex - 1][0].split('_')[0]
            currentModule = currentModule.replace(/\D+/, '')
            that.createModule('Module ' + currentModule)
            var id_cachedValue = that.id

            function doStuff() {
                if (that.id === id_cachedValue) { //we want it to match
                    setTimeout(doStuff, 50) //wait 50 millisecnds then recheck
                    return;
                }
                that.pages[that.pageIndex][1].push(currentModule)
                that.createPage(that.pages[that.pageIndex], that.id)
            }
            doStuff()
        },

        ///////////////////////////////////////////////
        ////////////BEGIN CREATE FUNCITONS/////////////
        ///////////////////////////////////////////////

        //creates a new module with the @param name given.
        createModule: function(name) {
            jQuery.ajax({
                url: "https://byu.instructure.com/api/v1/courses/" + this.courseNumber + "/modules?access_token=" + FileScraper.oAuth,
                type: "POST",
                data: {
                    module: {
                        "name": name
                    }
                },
                success: function(response) {
                    console.log(response)
                    FileScraper.id = response.id
                },
                error: function(response) {
                    alert("Error! Check the console and try again..");
                    console.log(response)
                },
            });
        },
        
        //Creates a page with the content kept in myarray, and in the module with this id
        createPage: function(myarray, id) {
            FileScraper.pageIndex++
                jQuery.ajax({
                    url: "https://byu.instructure.com/api/v1/courses/" + this.courseNumber + "/pages?access_token=" + FileScraper.oAuth,
                    type: "POST",
                    data: {
                        wiki_page: {
                            "title": myarray[1][0],
                            "body": myarray[1][1]
                        }
                    },
                    success: function(response) {
                        console.log(response)
                        FileScraper.attachPage(response.url, id)


                    },
                    error: function(response) {
                        alert("Error! Check the console and try again..");
                        console.log(response);
                    },
                });
        },

        //Attaches the created page with the right module.
        attachPage: function(url, id) {
            jQuery.ajax({
                url: "https://byu.instructure.com/api/v1/courses/" + this.courseNumber + "/modules/" + id + "/items?access_token=" + FileScraper.oAuth,
                type: "POST",
                data: {
                    module_item: {
                        "type": "Page",
                        "page_url": url
                    }
                },
                success: function(response) {
                    console.log(response)
                    FileScraper.detectModules()
                },
                error: function(response) {
                    alert("Error! Check the console and try again..");
                    console.log(response);
                },
            });
        }
    }
    ///////////////////////////////////////////////
    ////////////END CREATE FUNCITONS///////////////
    ///////////////////////////////////////////////


// url and request type defined by the text fields


setTimeout(FileScraper.init, 400);