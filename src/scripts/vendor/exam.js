'use strict';

(function () {

    $.fn.exam = function (options) {

        // Options
        const setting = $.extend({
            id: 'canvasBlock',
            width: '1200',
            height: '400',
            penShape: 'round', //butt, round, square
            penWidth: '10',
            penColor: 'black',
            clearCanvas: true,
            saveImg: true,
            fullscreen: true,
        }, options);


        // Elemets plugin
        let canvasContainer = $('<canvas/>').attr({
                id: setting.id,
                width: setting.width,
                height: setting.height,
            }),

            tools = $('<div>').attr({
                id: 'tools',
            }),

            changeWidth = $('<input/>').attr({
                id: 'changeWidth',
                type: 'number',
                step: '1',
                max: '20',
                min: '1',
                value: setting.penWidth,
            }),

            changeColor = $('<input/>').attr({
                id: 'changeColor',
                type: 'color',
            }),

            clear = $('<button/>').attr({
                id: 'clear',
                type: 'button',
            }).append('clear'),

            fullScreen = $('<button/>').attr({
                id: 'fullscreen',
                type: 'button',
            }).append('fullscreen'),

            changeShare = $('<div/>').append(
                $('<label/>').attr({
                    for: 'round',
                }).append('round').append(
                    $('<input/>').attr({
                        name: 'share',
                        id: 'round',
                        type: 'radio',
                        value: 'round',
                        checked: true,
                    })
                )).append(
                $('<label/>').attr({
                    for: 'square',
                }).append('square').append(
                    $('<input/>').attr({
                        name: 'share',
                        id: 'square',
                        type: 'radio',
                        value: 'square',
                    })
                )
            );

        this.width(setting.width).height('auto');

        // Add canvas container and panel tools
        this.append(canvasContainer).append(tools);

        let canvas = document.getElementById(setting.id),
            ctx = canvas.getContext('2d'),
            dataURL = canvas.toDataURL("image/jpg"),
            toolsPanel = $('#tools'),
            start;

        //Element link for save img
        let save = $('<button>').append($('<a/>').attr({
            id: 'save',
            href: dataURL,
            download: 'exam.jpg',
        }).append('save'));

        //Add tools on toolPanel
        toolsPanel.append(changeWidth).append(changeColor).append(changeShare);

        if (setting.fullscreen) {
            toolsPanel.append(fullScreen);
        }

        //Change width pen
        $('#changeWidth').change(function () {
            setting.penWidth = this.value;
        });

        //Change color pen
        $('#changeColor').change(function () {
            setting.penColor = this.value;
        });

        //Change shape pen
        $(this).find('[type="radio"]').change(function () {
            setting.penShape = this.getAttribute('id');
        });


        $('#fullscreen').on('click', () => {
            document.getElementById(this.attr('id')).requestFullscreen();
            console.log(screen.width);
            console.log(screen.height);
            $('#canvasBlock').attr({
                width: screen.width,
                height: screen.height,
            })
        });

        document.getElementById(this.attr('id')).addEventListener("fullscreenchange", () => {
            if (document.fullscreen == false) {
                $('#canvasBlock').attr({
                    width: setting.width,
                    height: setting.height,
                })
            }
        });

        $(window).on('resize', () => {
           sizeCanvas();
        });

        $(document).ready(() => {
           sizeCanvas();
        });

        function sizeCanvas() {
            if (setting.width > $(window).width()) {
                $('#canvasBlock').attr({
                    width: $(window).width(),
                })
            } else {
                $('#canvasBlock').attr({
                    width: setting.width,
                })
            }
            if (setting.height > $(window).height()) {
                $('#canvasBlock').attr({
                    height: $(window).height(),
                })
            } else {
                $('#canvasBlock').attr({
                    height: setting.height,
                })
            }
            if (document.fullscreen == true) {
                $('#canvasBlock').attr({
                    width: screen.width,
                    height: screen.height,
                })
            }
        }

        document.onmousedown = () => {
            canvas.onmousemove = (e) => {
                start = true;

                toolsPanel.addClass('hide');

                let x = e.offsetX;
                let y = e.offsetY;
                let dx = e.movementX;
                let dy = e.movementY;

                ctx.lineCap = setting.penShape;
                ctx.lineWidth = setting.penWidth;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x - dx, y - dy);
                ctx.strokeStyle = setting.penColor;
                ctx.stroke();
                ctx.closePath();
            }
        };

        document.onmouseup = () => {
            canvas.onmousemove = null;

            toolsPanel.removeClass('hide');

            //Make clear button, after start
            if (!$('#clear').length && start && setting.clearCanvas) {
                $('#tools').append(clear);

                $('#clear').on('click', () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                });
            }

            //Make link for download img, after start
            if (!$('#save').length && start && setting.saveImg) {
                toolsPanel.append(save);
            } else {
                let dataURL = canvas.toDataURL("image/jpg");

                $('#save').attr('href', dataURL);
            }
        };
    };
}());

