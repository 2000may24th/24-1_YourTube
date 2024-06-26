/* global chrome */

async function replaceNewVideos() {
    // 기존 요소 찾기
    var existingElement = document.querySelector('.style-scope ytd-rich-grid-renderer');

    // 요소가 존재하는지 확인
    if (existingElement) {
        // 기존 요소의 부모 요소 저장
        var parentElement = existingElement.parentNode;

        // 기존 요소 제거
        existingElement.remove();

        // 새로운 콘텐츠 생성
        const newContent = document.createElement('div');
        newContent.className = 'newcontent';
        newContent.id = 'mycontent';
/*
        // 버튼 컨테이너 생성
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.style = `
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        `;

        // 초기 버튼 설정 (A~E)
        let selectedLabels = ['A', 'B', 'C', 'D', 'E'];
        const buttonLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        function createButton(label) {
            const button = document.createElement('button');
            button.textContent = label;
            button.style = `
                padding: 10px 20px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
                position: relative;
            `;
            button.onmouseover = () => button.style.backgroundColor = '#555';
            button.onmouseout = () => button.style.backgroundColor = '#333';
            button.onclick = () => {
                toggleSubButtons(button);
            };
            return button;
        }

        function createSubButton(label) {
            const subButton = document.createElement('button');
            subButton.textContent = label;
            subButton.style = `
                padding: 5px 10px;
                background-color: #555;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
                margin-top: 5px;
                display: block;
            `;
            subButton.onmouseover = () => subButton.style.backgroundColor = '#777';
            subButton.onmouseout = () => subButton.style.backgroundColor = '#555';
            return subButton;
        }

        function toggleSubButtons(mainButton) {
            let subButtonsContainer = mainButton.querySelector('.sub-buttons-container');
            if (!subButtonsContainer) {
                subButtonsContainer = document.createElement('div');
                subButtonsContainer.className = 'sub-buttons-container';
                subButtonsContainer.style = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: #444;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 5px;
                    z-index: 1000;
                `;

                const initialSubButtons = ['a', 'b'];
                initialSubButtons.forEach(label => {
                    const subButton = createSubButton(label);
                    subButtonsContainer.appendChild(subButton);
                });

                const addButton = createSubButton('추가');
                addButton.onclick = () => {
                    const newLabel = prompt('새로운 버튼 이름을 입력하세요:');
                    if (newLabel) {
                        const newSubButton = createSubButton(newLabel);
                        subButtonsContainer.insertBefore(newSubButton, addButton);
                    }
                };
                subButtonsContainer.appendChild(addButton);

                mainButton.appendChild(subButtonsContainer);
            } else {
                mainButton.removeChild(subButtonsContainer);
            }
        }

        function updateButtons() {
            buttonContainer.innerHTML = '';
            selectedLabels.forEach(label => {
                const button = createButton(label);
                buttonContainer.appendChild(button);
            });
            // 버튼 6 (토글창 열기 버튼) 추가
            const toggleButton = document.createElement('button');
            toggleButton.textContent = '선택';
            toggleButton.style = `
                padding: 10px 20px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            `;
            toggleButton.onmouseover = () => toggleButton.style.backgroundColor = '#555';
            toggleButton.onmouseout = () => toggleButton.style.backgroundColor = '#333';
            toggleButton.onclick = showToggleWindow;
            buttonContainer.appendChild(toggleButton);
        }

        function showToggleWindow() {
            const overlay = document.createElement('div');
            overlay.style = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;

            const toggleWindow = document.createElement('div');
            toggleWindow.style = `
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;

            const checkboxContainer = document.createElement('div');
            checkboxContainer.style = `
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 10px;
                margin-bottom: 20px;
            `;

            const checkboxes = buttonLabels.map(label => {
                const labelElement = document.createElement('label');
                labelElement.style = `
                    display: flex;
                    align-items: center;
                    gap: 5px;
                `;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = label;
                checkbox.checked = selectedLabels.includes(label);
                labelElement.appendChild(checkbox);
                labelElement.appendChild(document.createTextNode(label));
                checkboxContainer.appendChild(labelElement);
                return checkbox;
            });

            const saveButton = document.createElement('button');
            saveButton.textContent = '저장';
            saveButton.style = `
                padding: 10px 20px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            `;
            saveButton.onmouseover = () => saveButton.style.backgroundColor = '#555';
            saveButton.onmouseout = () => saveButton.style.backgroundColor = '#333';
            saveButton.onclick = () => {
                selectedLabels = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value).slice(0, 5);
                updateButtons();
                document.body.removeChild(overlay);
            };

            const cancelButton = document.createElement('button');
            cancelButton.textContent = '취소';
            cancelButton.style = `
                padding: 10px 20px;
                margin-left: 10px;
                background-color: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            `;
            cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#555';
            cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#333';
            cancelButton.onclick = () => {
                document.body.removeChild(overlay);
            };

            const buttonGroup = document.createElement('div');
            buttonGroup.style = `
                display: flex;
                justify-content: center;
            `;
            buttonGroup.appendChild(saveButton);
            buttonGroup.appendChild(cancelButton);

            toggleWindow.appendChild(checkboxContainer);
            toggleWindow.appendChild(buttonGroup);
            overlay.appendChild(toggleWindow);
            document.body.appendChild(overlay);
        }

        updateButtons();

        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';
        containerDiv.style = `
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: flex-start;
            margin-top: 50px;
            margin-bottom: 15px;
            margin-left: 20px;
        `;
*/
        // Add a container for the "최신순" text and the video content
        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';
        containerDiv.style = `
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: flex-start;
            margin-top: 50px;
            margin-bottom: 15px;
            // background-color: lightyellow;
            margin-left: 20px;
        `;

        // Add 최신순 text
        const latestText = document.createElement('div');
        latestText.textContent = '최신순';
        latestText.style = `
            font-size: 20px;
            font-weight: bold;
            color: white;
        `;
        //buttonContainer도 주석 해제해야 함!
        /*
        containerDiv.appendChild(buttonContainer);
        */
        containerDiv.appendChild(latestText);
        containerDiv.appendChild(newContent);
        parentElement.appendChild(containerDiv);



         // Fetch the sample data from the JSON file via background script
        // 크롬 확장 프로그램 보안 정책땜에 json파일을 background.js에서 접근해서 contentscript.js로 전달하는 로직
        // 지금은 data/testData600.json으로 설정되어 있음.
        let sampleData;
        try {
            const response = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: "fetchData" }, (response) => {
                    if (response.success) {
                        resolve(response.data);
                    } else {
                        reject(response.error);
                    }
                });
            });
            sampleData = response;
            console.log("Data: ", sampleData);
        } catch (error) {
            console.error('Error fetching the sample data:', error);
            return;
        }


        function getTimeDifference(publishTime) {
            const now = new Date();
            const publishDate = new Date(publishTime);
            const diffInSeconds = Math.floor((now - publishDate) / 1000);
            const minutes = Math.floor(diffInSeconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (years > 0) return `${years}년 전`;
            else if (months > 0) return `${months}개월 전`;
            else if (days > 0) return `${days}일 전`;
            else if (hours > 0) return `${hours}시간 전`;
            else if (minutes > 0) return `${minutes}분 전`;
            else return `방금 전`;
        }

        function formatViewCount(views) {
            const num = Number(views);
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + '백만';
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천';
            }
            return num;
        }

        function createYoutubeBox(videoData) {
            const videoId = videoData.video_id;
            const thumbnail = videoData.thumbnail[0].url;
            let videoTitle = videoData.title;
            const channelName = videoData.ChannelTitle;
            const publishTime = videoData.published;
            const channelIcon = videoData.channel_icon;
            const viewCounts = formatViewCount(videoData.views);
            const channelId = videoData.channel_id;

            const youtubeBox = document.createElement('div');
            youtubeBox.className = 'youtube-box';
            youtubeBox.style = `
                display: flex;
                width: 385px;
                height: 310px;
                flex-direction: column;
                padding: 1rem;
                margin-bottom: 20px;
                color: #fff;
                cursor: pointer;
            `;
            youtubeBox.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;

            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.className = 'thumbnail';
            thumbnailDiv.style = `
                flex: 2.5;
                display: flex;
                border-radius: 15px;
                margin-bottom: 1rem;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                width: 100%;
                height: 100%;
                cursor: pointer;
            `;
            thumbnailDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = thumbnail;
            thumbnailImg.alt = "video";
            thumbnailImg.style = `
                width: 100%;
                height: auto;
            `;
            thumbnailDiv.appendChild(thumbnailImg);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.style = `
                flex: 1;
                flex-direction: column;
                display: flex;
            `;

            const rowDiv1 = document.createElement('div');
            rowDiv1.className = 'row';
            rowDiv1.style = `
                flex: 1;
                display: flex;
                flex-direction: row;
            `;

            const channelIconDiv = document.createElement('div');
            channelIconDiv.className = 'channel-icon';
            channelIconDiv.style = `
                flex: none;
                width: 35px;
                height: 35px;
                margin-right: 10px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.5rem;
                overflow: hidden;
                /* border: 1px solid #333; */
                background-image: url('${channelIcon}');
                background-size: cover;
                background-position: center;
                cursor: pointer;
            `;

            channelIconDiv.addEventListener('click', (event) => {
            //상위 요소 이벤트 막음
                event.stopPropagation();
                window.location.href = `https://www.youtube.com/channel/${channelId}`;
            });

            if (videoTitle.length > 60) {
                videoTitle = videoTitle.substring(0, 60) + " ...";
            }

            const titleDiv = document.createElement('div');
            titleDiv.className = 'title';
            titleDiv.onclick = () => window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
            titleDiv.style = `
                flex: 1;
                text-align: start;
                align-items: start;
                display: flex;
                margin-top: 5px;
                overflow: hidden;
                cursor: pointer;
                // max-height: 48px;
            `;
            const titleText = document.createElement('div');
            titleText.className = 'title-text';
            titleText.textContent = videoTitle;
            titleText.style = `
                color: white;
                font-weight: bold;
                font-size: 16px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                // line-height: 24px; /* Adjust line height as per design */
            `;

            titleDiv.appendChild(titleText);

            rowDiv1.appendChild(channelIconDiv);
            rowDiv1.appendChild(titleDiv);

            const columnDiv2 = document.createElement('div');
            columnDiv2.className = 'column info';
            columnDiv2.style = `
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start; /* Align items to the start */
                padding-top: 0.5rem;
                padding-left: 47px; /* Same margin as channel icon */
            `;

            const channelNameDiv = document.createElement('div');
            channelNameDiv.className = 'info-text';
            channelNameDiv.textContent = channelName;
            channelNameDiv.style = `
                font-size: 14px;
                color: #aaa;
                margin-bottom: 3px;
                cursor: pointer;
                transition: color 0.3s; /* Smooth transition for the hover effect */
            `;

            channelNameDiv.addEventListener('click', (event) => {
            //상위 요소 이벤트 막음
                event.stopPropagation();
                window.location.href = `https://www.youtube.com/channel/${channelId}`;
            });

            channelNameDiv.addEventListener('mouseenter', () => {
                channelNameDiv.style.color = 'white';
            });

            channelNameDiv.addEventListener('mouseleave', () => {
                channelNameDiv.style.color = '#aaa';
            });

            const viewInfoDiv = document.createElement('div');
            viewInfoDiv.className = 'info-text';
            viewInfoDiv.textContent = `조회수 ${viewCounts}회 \u2022 ${getTimeDifference(publishTime)}`;
            viewInfoDiv.style = `
                font-size: 14px;
                color: #aaa;
            `;

            columnDiv2.appendChild(channelNameDiv);
            columnDiv2.appendChild(viewInfoDiv);

            contentDiv.appendChild(rowDiv1);
            contentDiv.appendChild(columnDiv2);

            youtubeBox.appendChild(thumbnailDiv);
            youtubeBox.appendChild(contentDiv);

            return youtubeBox;
        }


        sampleData.forEach(videoData => {
            const videoBox = createYoutubeBox(videoData);
            newContent.appendChild(videoBox);
        });

        parentElement.appendChild(newContent);

        parentElement.style.display = 'flex';
        parentElement.style.flexDirection = 'column';
        parentElement.style.justifyContent = 'center';
        newContent.style.display = 'flex';
        newContent.style.flexWrap = 'wrap'; // Allow wrapping
        newContent.style.flexDirection = 'row'; // Align items in rows
        newContent.style.marginLeft = '10px';
        newContent.style.justifyContent = 'flex-start';
    } else {
        console.error('기존 요소를 찾을 수 없습니다. 강력 새로고침 후 재실행합니다.');
        chrome.runtime.sendMessage({action: "forceReload"});
    }
}

window.addEventListener('load', replaceNewVideos);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "runReplace") {
        replaceNewVideos();
    }
});
