"use strict";
const pg = new panelGenerator()
// function showAndHide() {
//     p.active('active')
// }
function examples(){
    const my_panel = pg.sidePanel('#sidePanel')
    my_panel.addSection('Women')
    my_panel.addSection('Men')
    my_panel.addSection('Kids')
    my_panel.addSection('Footwear')
    my_panel.addSection('Gear')
    my_panel.addNestedSections('Women',['Shoes','Jackets','Tops','Pants'])
    my_panel.addNestedSections('Men',['Shoes','Jackets','Tops','Pants'])

    my_panel.createSliderButton()
    my_panel.createToggleButton()
    my_panel.sliding()
    my_panel.dragAndDrop()
    my_panel.navAndSideExchange()
    my_panel.showHideNested()
}

examples();