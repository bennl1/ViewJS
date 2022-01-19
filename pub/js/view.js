"use strict";

(function(global, document, $) { 

    function panelGenerator(){
        
    }

    panelGenerator.prototype = {

    
        sidePanel: function(selector){
            const _self = {}
            _self.mode = 'sidePanel'
            _self.selector = selector
            _self.element = document.querySelector(selector)
            _self.element.style.left = "-300px"
            _self.element.style.width = "300px"
            _self.element.style.transition = ".6s"
            $(selector).append($("<div>").addClass('sectionList').append('<ul>'))

            _self.addSection = function(sectionName){
                $('.sectionList ul').append(
                    $('<li>').append($('<span>').css({"cursor":"pointer",'font-family':'Arial, Helvetica, sans-serif'}).append(
                        document.createTextNode(sectionName)).on('mouseover', function() {
                            $(this).css({'background-color':'white',"border-radius":"8px"})
                        }).on('mouseout',function(){
                            $(this).css('background-color', '')
                        }).css('padding','10px').attr("draggable","true")
                        ));
            }

            // nestedSubs is an array of the sub sections want to add
            _self.addNestedSections = function(parentSectionName, nestedSubs){
                const list = _self.element.querySelector('ul')
                for(var i = 0; i < list.children.length; i++){
                    if(list.children[i].innerText == parentSectionName){
                        console.log(list.children[i].innerText)
                        var toInsertLength = nestedSubs.length
                        var subList = document.createElement('ul')
                        
                        subList.style.display = 'none'
                        
                        for(var j=0; j<toInsertLength; j++){
                            var textNode = document.createTextNode(nestedSubs[j])
                            var subListItem = document.createElement('li')
                            subListItem.style.fontFamily = 'Arial, Helvetica, sans-serif'
                            subListItem.onmouseover = function(){
                                this.style.backgroundColor = 'white';
                                this.style.borderBottomLeftRadius = '8px';
                                this.style.borderBottomRightRadius = '8px';
                            };
                            subListItem.onmouseout = function(){
                                this.style.backgroundColor = '';
                            };
                            subListItem.appendChild(document.createTextNode("- "))
                            subListItem.appendChild(textNode)
                            subList.appendChild(subListItem)                        
                        }
                        list.children[i].appendChild(subList)
                            
                    }
                }
                
                
            }

            _self.removeSection = function(sectionName){
                const list = _self.element.querySelector('ul')
                for(i = 0; i < list.children.length; i++){
                    if(list.children[i].innerText == sectionName){
                        list.removeChild(list.children[i])
                    }
                }
            }

            _self.showHideNested = function(){
                var sections = document.querySelectorAll('ul')[0].children
                console.log(sections)
                var sectionLength = sections.length
                for(var i = 0; i < sectionLength; i++){
                    var singleSection = sections[i]
                    console.log(singleSection)
                    singleSection.addEventListener('click', showNested)
                }
                function showNested(e){
                    console.log('clicked!!!!!!')
                    var subList = e.target.nextSibling
                    if(subList){
                        if(subList.style.display === 'none') {
                            subList.style.display = 'block'
                            
                        } else if (subList.style.display === 'block'){
                            subList.style.display = 'none'
                        }
                    }
                    
                }

            }

            _self.createSliderButton = function(){
                const slider = $('<div>').addClass('slider').prop('title','Drag to enlarge or shrink the side panel!')
                $(selector).append(slider);
                $('.slider').css({'position':'absoulte', 'width':'10px',
                'height':'100%', 'background-color': 'rgb(133,133,131)', 'float': 'right','cursor':'ew-resize'})
            }

            _self.createToggleButton = function(){
                const toggler = $('<div>').addClass('toggler').prop('title','Click to show and hide the side panel!')
                for(let i = 0; i<3; i++){
                    const horizonLine = $('<span>').addClass('togglerSpan')
                    toggler.append(horizonLine)
                }
                toggler[0].addEventListener('click', showHidePanel)
                function showHidePanel(e){
                    var sidePanel = document.querySelector(selector)
                    if(sidePanel.style.left != "-300px"){
                        sidePanel.style.left = "-300px"
                        sidePanel.style.width = "300px"
                        sidePanel.style.transition = ".6s"
                        var toggler = _self.element.getElementsByClassName('toggler')[0]
                        toggler.style.left = "330px"
                        toggler.style.transition = ".6s"

                        var sectionList = _self.element.getElementsByClassName('sectionList')[0]
                        sectionList.style.left = "40px"
                        var exchanger = _self.element.getElementsByClassName('exchanger')[0]
                        exchanger.style.left = "330px"
                        exchanger.style.transition = ".6s"

                    } else {
                        sidePanel.style.left = "0px"
                        sidePanel.style.width = "300px"
                    }

                }
                $(selector).append(toggler);
                $('.toggler').css({'position': 'absolute', 'top': '30px', 'left': '330px',"cursor":"pointer"})
                $('.togglerSpan').css({'width': '35px','height':'4px','border-radius':'8px','background':'blanchedalmond','display':'block','margin-top':'4px'})
                
            }

            _self.sliding = function(){
                const slider = _self.element.querySelector('.slider')
                
                slider.addEventListener("mousedown",mousedown);
                function mousedown(e){
                    _self.element.style.transition = ".0s"
                    var toggler = _self.element.getElementsByClassName('toggler')[0]
                    toggler.style.transition = ".0s"
                    var exchanger = _self.element.getElementsByClassName('exchanger')[0]
                    exchanger.style.transition = ".0s"
                    console.log('clicked inside panel')
                    var prev_horizontal = e.clientX;
                    window.addEventListener('mousemove',mousemove);
                    window.addEventListener('mouseup', mouseup);

                    function mousemove(e){
                        const dimension = _self.element.getBoundingClientRect();
                        _self.element.style.width = dimension.width - (prev_horizontal - e.clientX) + 'px';
                        var toggler = _self.element.getElementsByClassName('toggler')[0]
                        toggler.style.left = toggler.getBoundingClientRect().x - (prev_horizontal - e.clientX) + 'px';
                        var exchanger = _self.element.getElementsByClassName('exchanger')[0]
                        exchanger.style.left = exchanger.getBoundingClientRect().x - (prev_horizontal - e.clientX) + 'px';
                        
                        var sectionList = _self.element.getElementsByClassName('sectionList')[0]
                        sectionList.style.left = sectionList.getBoundingClientRect().x - (prev_horizontal - e.clientX) + 'px';
                        
                        prev_horizontal = e.clientX;

                    }
                    function mouseup(){
                        console.log("mouse released")
                        window.removeEventListener("mousemove",mousemove)
                        window.removeEventListener("mouseup",mouseup)
                    }
                }
            }
            
            _self.dragAndDrop = function(){
                var items = document.querySelectorAll(".sectionList ul")[0].children,
                    dragged = null;

                for (var item of items){
                    item.addEventListener("dragstart", function(){
                        dragged = this
                    });
                    item.addEventListener("dragenter", function(){
                        if(this != dragged){
                            this.children[0].classList.add("active")
                        }
                    });
                    item.addEventListener("dragleave", function(){
                        if(this != dragged){
                            this.children[0].classList.remove("active")
                        }
                    });
                    item.addEventListener("dragend", function(){
                        for(var item of items){
                            item.children[0].classList.remove("active")
                        }
                    });
                    item.addEventListener("dragover", function(e){
                        e.preventDefault();
                    });
                    item.addEventListener("drop",function(e){
                        e.preventDefault();
                        if(this!=dragged){
                            var all_sections = document.querySelectorAll(".sectionList li"),
                                draggedpos = 0 , droppedpos = 0;
                            for(var i =0; i< all_sections.length; i++){
                                if(dragged == all_sections[i]){
                                    draggedpos = i
                                }
                                if(this == all_sections[i]){
                                    droppedpos = i
                                }
                            }
                            if(draggedpos < droppedpos){
                                this.parentNode.insertBefore(dragged, this.nextSibling);    
                            } else {
                                this.parentNode.insertBefore(dragged, this);
                            }
                        }
                    });
                }
            }

            _self.toNav = function(){
                _self.mode = 'nav'
                var toggler = document.querySelector('.toggler')
                toggler.style.display = 'none'
                var slider = document.querySelector('.slider')
                slider.style.display = 'none'
                _self.element.style.width = '100%'
                _self.element.style.height = '70px'
                _self.element.style.left = '0px'
                
                var sectionList = document.querySelector(".sectionList")
                sectionList.style.height = '80%'
                sectionList.style.width = "90%"
                sectionList.style.left = "40px"
                sectionList.style.marginTop = "7px"

                var sectionListItem = document.querySelectorAll('ul')[0].children
                for(var i = 0; i<sectionListItem.length; i++){
                    sectionListItem[i].style.display = 'inline-block'
                    sectionListItem[i].style.position = 'relative'
                    sectionListItem[i].style.padding = '0px 25px'
                    if(sectionListItem[i].querySelectorAll('ul').length != 0){
                        var subList = sectionListItem[i].querySelectorAll('ul')[0]
                        subList.style.top = '40px'
                        subList.style.position = 'absolute'
                        subList.style.borderBottomLeftRadius = '8px'
                        subList.style.borderBottomRightRadius = '8px'
                        subList.style.position = 'absolute'
                        subList.style.display = 'none'
                        subList.style.width = '90px'
                        subList.style.backgroundColor = 'blanchedalmond'
                        subList.style.padding = '0px'
                    }
                }
                _self.element.style.transition = ".6s"
                var toggler = _self.element.getElementsByClassName('toggler')[0]
                toggler.style.transition = ".6s"
                var exchanger = _self.element.getElementsByClassName('exchanger')[0]
                exchanger.style.transition = ".6s"
                $('.exchanger').css({'text-align':'center','position':'absolute','width': '60px','height':'35px','border-radius':'8px','display':'block','top': '18px', 'left': '95%',"cursor":"pointer","background-color":'blanchedalmond'})
                $('.exchangerSpan').css({'top':'10px','position':'relative','font-family':'Arial, Helvetica, sans-serif'})
                
                
            }

            _self.toSide = function(){
                _self.mode = 'sidePanel'
                var toggler = document.querySelector('.toggler')
                toggler.style.display = ''
                var slider = document.querySelector('.slider')
                slider.style.display = ''
                _self.element.style.width = '300px'
                _self.element.style.height = '100%'
                _self.element.style.left = '-300px'
                
                var sectionList = document.querySelector(".sectionList")
                sectionList.style.height = 'auto'
                sectionList.style.width = "auto"
                
                sectionList.style.marginTop = "40px"
                
                var sectionListItem = document.querySelectorAll('ul')[0].children
                for(var i = 0; i<sectionListItem.length; i++){
                    sectionListItem[i].style.display = ''
                    sectionListItem[i].style.padding = '15px 20px'
                    if(sectionListItem[i].querySelectorAll('ul').length != 0){
                        var subList = sectionListItem[i].querySelectorAll('ul')[0]
                        subList.style.display = 'none'
                        subList.style.position = ''
                        subList.style.width = '122px'
                        subList.style.padding = '0px 20px'
                    }
                }
                $('.toggler').css({'position': 'absolute', 'top': '30px', 'left': '330px',"cursor":"pointer"})
                $('.togglerSpan').css({'width': '35px','height':'4px','border-radius':'8px','background':'blanchedalmond','display':'block','margin-top':'4px'})

                $('.exchanger').css({'text-align':'center','position':'absolute','width': '60px','height':'35px', 'top': '90%', 'left': '330px','display':'block','border-radius':'8px', "cursor":"pointer","background-color":'blanchedalmond'})
                $('.exchangerSpan').css({'top':'10px','position':'relative','font-family':'Arial, Helvetica, sans-serif'})
                
            }


            _self.navAndSideExchange = function(){
                const exchanger = $('<div>').addClass('exchanger').prop('title','Click to change between horizontal and vertical format!')
                exchanger.append($('<span>').addClass('exchangerSpan').append(document.createTextNode("SWAP")))
                $(selector).append(exchanger);
                $('.exchanger').css({'text-align':'center','position':'absolute','width': '60px','height':'35px', 'top': '90%', 'left': '330px',
                'display':'block','border-radius':'8px', "cursor":"pointer","background-color":'blanchedalmond'})
                $('.exchangerSpan').css({'top':'10px','position':'relative','font-family':'Arial, Helvetica, sans-serif'})

                $(".exchanger").hover(function(e) {
                    $(this).css("background-color",e.type === "mouseenter"?"purple":"blanchedalmond")
                });
                exchanger[0].addEventListener('click',exchange)
                function exchange(e){
                    console.log('SWAPPING!!!!!!')
                    if(_self.mode === 'sidePanel'){
                        _self.toNav()
                    } else if(_self.mode === 'nav'){
                        _self.toSide()
                    }
                        
                    
                    
                }
            }

            return _self
        }
    }
    global.panelGenerator = global.panelGenerator || panelGenerator


})(window, window.document, $);