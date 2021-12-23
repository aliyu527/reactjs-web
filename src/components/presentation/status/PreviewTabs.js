import React, { Component } from 'react';
import Config from '../../../utils/Config';

class PreviewTabs extends Component {
    handleClick (e) {
        this.props.onSelect(this.props.files[e.target.getAttribute('i')]);
    }
    render () {
        return (
            <div class="preview-nav-container">
                {this.props.files.map((file, i) => {
                    if (file.type == 'audio') {
                        return (
                            <div key={i} i={i} class="item" onClick={this.handleClick.bind(this)} >
                                <div class="cicle" i={i}>
                                    {/*<span class="identifier" i={i}><i i={i} class="fa fa-headphones"></i></span>*/}
                                    <img i={i} src={ file.icon ? Config.FILES.TEMP+'/icons/'+file.icon : '/static/icons/headphone-x60-2.png' } />
                                </div>
                            </div>
                        )
                    } else if (file.type == 'video') {
                        return (
                            <div key={i} i={i} class="item" onClick={this.handleClick.bind(this)} >
                                <div i={i} class="cicle">
                                    {/*<span i={i} class="identifier"><i i={i} class="fa fa-video-camera"></i></span>*/}
                                    <img i={i} src={ Config.FILES.TEMP+'/icons/'+file.icon } />
                                </div>
                            </div>
                        )
                    } else if (file.type == 'photo') {
                        return (
                            <div key={i} i={i} class="item" onClick={this.handleClick.bind(this)} >
                                
                                <div i={i} class="cicle">
                                    {/*<span i={i} class="identifier"><i i={i} class="fa fa-camera"></i></span>*/}
                                    <img i={i} src={ Config.FILES.TEMP+'/icons/'+file.icon } />
                                </div>
                            </div>
                        )
                    }
                }) }
            </div>
        )
    }
}

export default PreviewTabs;