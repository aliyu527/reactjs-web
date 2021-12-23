import React, { Component } from 'react';
import Cropper from 'cropperjs';
import Config from '../../../utils/Config'

class Preview {
    static initAudio () {
        console.log('Init Audio');
    }
    static audio (file) {
        return (
            <div class="audio-edit-wrap" id="audio-edit-wrap">
                <div class="video-player">
                    <img src={ file.cover ? Config.FILES.TEMP+'/cover/'+file.cover : '/static/icons/headphone-x60-2.png' } />
                    <a class="play-video play-video--small">
                        <svg class="olymp-play-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-pause-icon"></use></svg>
                    </a>
                    <div class="overlay overlay-dark"></div>
            
                    <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></div>
                </div>
            </div>
        )
    }
    static initVideo () {
        console.log('Init Video');
    }
    static video (file) {
        return (
            <div class="video-edit-wrap" id="video-edit-wrap">
                <div class="video-player">
                    <video src={ Config.FILES.TEMP+"/"+file.filename }></video>
                    <a class="play-video play-video--small">
                        <svg class="olymp-play-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-pause-icon"></use></svg>
                    </a>
                    <div class="overlay overlay-dark"></div>
            
                    <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></div>
                </div>
            </div>
        )
    }
    static initPhoto(image) {
        let cropper = new Cropper(image, { // document.querySelector('.photo-edit-item.editor img')
            dragMode: 'move', autoCropArea: .9, checkCrossOrigin: false, checkOrientation: false, 
            crop(e) { 
                console.log([ {x: e.detail.x}, {y: e.detail.y},{height: e.detail.height},{width: e.detail.width},{rotate: e.detail.rotate},{scaleX: e.detail.scaleX}, {scaleY: e.detail.scaleY }]); 
            }, ready () { 
                $('.editor-ctrl button').on('click', function (e) { let data = $(this).data(); if (data.method == 'zoom') { cropper.zoom(data.option); } else if (data.method == 'move') { cropper.move(data.option, data.secondOption); } else if (data.method == 'rotate') { cropper.rotate(data.option); } else if (data.method == 'scaleX') { cropper.scaleX(-data.option); data.option = data.option == '-1' ? 1 : -1; } else if (data.method == 'scaleY') { cropper.scaleY(-data.option); data.option = data.option == '-1' ? 1 : -1; } else if (data.method == 'reset') { cropper.reset(); } }); 
            }
        });
    }
    static photo (file) {
        return (
            <div class="photo-edit-wrap" id="photo-edit-wrap">
                <div class="photo-edit-item editor-ctrl">
                    <button type="button" title="Zoom In" class="btn" data-method="zoom" data-option="0.1"><span class="fa fa-search-plus"></span></button>
                    <button type="button" title="Zoom Out" class="btn" data-method="zoom" data-option="-0.1"><span class="fa fa-search-minus"></span></button>
                    <button type="button" title="Move Left" class="btn" data-method="move" data-option="-10" data-second-option="0"><span class="fa fa-arrow-left"></span></button>
                    <button type="button" title="Move Right" class="btn" data-method="move" data-option="10" data-second-option="0"><span class="fa fa-arrow-right"></span></button>
                    <button type="button" title="Move Up" class="btn" data-method="move" data-option="0" data-second-option="-10"><span class="fa fa-arrow-up"></span></button>
                    <button type="button" title="Move Down" class="btn" data-method="move" data-option="0" data-second-option="10"><span class="fa fa-arrow-down"></span></button>
                    <button type="button" title="Rotate Left" class="btn" data-method="rotate" data-option="-22.5"><span class="fa fa-rotate-left"></span></button>
                    <button type="button" title="Rotate Right" class="btn" data-method="rotate" data-option="22.5"><span class="fa fa-rotate-right"></span></button>
                    <button type="button" title="Flip Horizontal" class="btn" data-method="scaleX" data-option="1"><span class="fa fa-arrows-h"></span></button>
                    <button type="button" title="Flip Vertical" class="btn" data-method="scaleY" data-option="1"><span class="fa fa-arrows-v"></span> </button>
                    <button type="button" title="Reset" class="btn" data-method="reset"><span class="fa fa-refresh"></span> </button>
                </div>
                <div class="photo-edit-item editor"><img src={ Config.FILES.TEMP+"/"+file.filename } alt="Photo" /></div>
            </div>
        )
    }
}

export default Preview;