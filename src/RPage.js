/*
RPage - Page Component
*/
import React from 'react'
import data_mainmenu from './data/mainmenu.js'
import pages from './data/pages.js'
import RDesc from './RDesc.js' 
import RExample from './RExample.js' 
import RMemo from './RMemo.js' 
import RStore from './data/RStore.js'
import RNavBar from './RNavBar.js' 
import Ri18n from './Ri18n.js' 

let RPage = React.createClass({
	render: function() {
        let data;

        let page_name = this.props.params.page;
        if (page_name && page_name != 'index.html') {
            data = pages[page_name];
        }else{
            data = pages['home'];
        }

        return (<div>        
        <RNavBar data = { data_mainmenu }  />
        {
            (data) ? <div className="container">
                    {
                        data.map(function(item, idx){
                            if (item.type == 'desc') return  <RDesc key = { 'pi' + idx } item={item} />;
                            else if (item.type == 'memo') return <RMemo key = { 'pi' + idx } item={item} />;
                            else return <RExample key = { 'pi' + idx } item={item} />;
                        })
                    }
                </div> : <div className="container"><RDesc item={ {
                    title: Ri18n.error, 
                    text: Ri18n.page_not_found 
                } } /></div>
        }
        </div>
        );
	}
});
  	
export default RPage
