let posts = [
    {
        'profileImg': 'img/istanbulProfile.jpg',
        'name': 'Ali',
        'time': '• 5 Min.',
        'location': 'Istanbul, Turkey',
        'images': 'img/istanbul.jpg',
        'likes': 26,
        'description': 'Ein trüber Tag in Istanbul',
        'comments': ['Beautiful!', 'Wann bist du denn dahin?', 'Paris hat besseres Wetter 😋'],
        'user': ['Chayenne', 'Jannik', 'Lisa'],
        'userLike': true
    },
    {
        'profileImg': 'img/manGlassesProfile.jpg',
        'name': 'Jannik',
        'time': '• 1 Std.',
        'location': '',
        'images': 'img/manGlasses.jpg',
        'likes': 78,
        'description': '#noHashtag',
        'comments': [],
        'user': [],
        'userLike': false
    },
    {
        'profileImg': 'img/manSmileProfile.jpg',
        'name': 'Lukas',
        'time': '• 1 Std.',
        'location': '',
        'images': 'img/manSmile.jpg',
        'likes': 125,
        'description': 'Keep smiling!',
        'comments': ['Komme übermorgen auch dahin', 'Wo bist du denn?'],
        'user': ['Ali', 'User'],
        'userLike': true
    },
    {
        'profileImg': 'img/parisProfile.jpg',
        'name': 'Lisa',
        'time': '• 4 Std.',
        'location': 'Paris, France',
        'images': 'img/paris.jpg',
        'likes': 378,
        'description': 'La tour eiffel 🥰',
        'comments': ['Ich wär auch gern da 😖', '❤'],
        'user': ['Selina', 'Lukas'],
        'userLike': false
    },
    {
        'profileImg': 'img/womanShortHairProfile.jpg',
        'name': 'Sara',
        'time': '• 22 Std.',
        'location': '',
        'images': 'img/womanShortHair.jpg',
        'likes': 46,
        'description': '',
        'comments': [],
        'user': [],
        'userLike': false
    },
    {
        'profileImg': 'img/womanSmileProfile.jpg',
        'name': 'Chayenne',
        'time': '• 3 Tage',
        'location': '',
        'images': 'img/womanSmile.jpg',
        'likes': 98,
        'description': 'Shine bright like a diamond 😋',
        'comments': ['Ist dir nicht kalt? 😳', 'Oh doch! 😂'],
        'user': ['Lukas', 'Chayenne'],
        'userLike': false
    },
    {
        'profileImg': 'img/png/user.png',
        'name': 'Selina',
        'time': '• 1 Wo.',
        'location': '',
        'images': 'img/womanSnow.jpg',
        'likes': 108,
        'description': '',
        'comments': ['OMG, wunderschön! 😍', 'Dankeschön! 🥰', 'Schneewittchen 😘', '🥰'],
        'user': ['Sara', 'Selina', 'Lisa', 'Selina'],
        'userLike': false
    }
]

let suggestions = [
    {
        'image': 'img/hasan.jpg',
        'name': 'Hasan',
        'commonFriends': 'Ali und 14 weitere Person(en)...',
        'followed': false,
    },
    {
        'image': 'img/lea.jpg',
        'name': 'Lea',
        'commonFriends': 'Selina und 3 weitere Person(en)...',
        'followed': false,
    },
    {
        'image': 'img/johanna.jpg',
        'name': 'Johanna',
        'commonFriends': 'Lisa und 5 weitere Person(en)...',
        'followed': false,
    },
    {
        'image': 'img/jan.jpg',
        'name': 'Jan',
        'commonFriends': 'Selina und 6 weitere Person(en)...',
        'followed': false,
    },
    {
        'image': 'img/max.jpg',
        'name': 'Max',
        'commonFriends': 'Jannik und 6 weitere Person(en)...',
        'followed': false,
    }
]

load();

function renderStories() {
    let post = document.getElementById('posts');
    post.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];

        post.innerHTML += postsTemplate(element, i);

        let comment = document.getElementById(`commentSection${i}`);

        for (let j = 0; j < element['comments'].length; j++) {

            comment.innerHTML += commentTemplate(element, i, j);
            userComment(i, j);
        }
        isLikedPost(element, i);
        isDescription(element, i);
        saveComments(element, i);
        saveLikes(element, i);
    }
}

function renderSuggestions() {
    let suggestion = document.getElementById('suggestions');
    suggestion.innerHTML = '';
    suggestion.innerHTML = /*html*/ `
    <h4>Vorschläge für dich</h4>
    `;

    for (let i = 0; i < suggestions.length; i++) {
        const element = suggestions[i];

        suggestion.innerHTML += suggestionTemplate(element);
    }
}

function postsTemplate(element, i) {
    return /*html*/ `
    <div class="gapRows lineBottom">
        <div class="postHeader">
            <img class="roundBorder small" src="${element['profileImg']}">
            <div>
                <div class="postHeader">
                    <p class="headerName margin0">${element['name']}</p>
                    <p class="time margin0">${element['time']}</p>
                </div>
                <p class="location margin0">${element['location']}</p>
            </div>
        </div>
        <div class="sharedPost" id="sharedPost${i}">
            <img class="postedImage" src="${element['images']}">
        </div>
        <div class="spaceBetween">
            <div class="icons" id="liked${i}">   
            </div>
            <div class="icons">
                <img src="img/png/bookmark.png">
            </div>
        </div>
        <p class="likes margin0">Gefällt ${element['likes']} Mal</p>
        <div class="gapRows">
            <div class="description comments" id="description${i}">
                <p class="name">${element['name']}</p>
                <p>${element['description']}</p>
            </div>
            <div class="commentSection" id="commentSection${i}">
            </div>
        </div>
        <div class=writeComment>
            <input class="input" id="input${i}" placeholder="Kommentieren ..." type="text">
            <button class="send" id="button${i}"onclick="comment(${i})">Senden</button>
        </div>
    </div>
    `;
}

function commentTemplate(element, i, j) {
    return /*html*/ `
    <div class="spaceBetween">
        <div class="comments">
            <p class="name">${element['user'][j]}</p>
            <p>${element['comments'][j]}</p>
        </div>
        <img class="trash d-none" id="trash${i}${j}" onclick="deleteComment(${i}, ${j})" src="img/png/delete.png">
    </div>
    `;
}

function suggestionTemplate(element, i) {
    return /*html*/ `
    <div class="row">
        <div class="rowChild">
            <img class="roundBorder small" src="${element['image']}">
            <span>
                <p class="name margin0">${element['name']}</p>
                <p class="margin0 grey">${element['commonFriends']}</p>
            </span>
        </div>
        <button>Folgen</button>
    </div>
    `;
}

function isDescription(element, i) {
    if (element['description'] == '') {
        document.getElementById(`description${i}`).classList.add('d-none');
    }
}

function comment(i) {
    let input = document.getElementById(`input${i}`);
    if (input.value != '' && input.value != ' ') {
        posts[i]['comments'].push(input.value);
        posts[i]['user'].push('User');
    }
    input.value = '';
    renderStories();
}

function userComment(i, j) {
    if (posts[i]['user'][j] == 'User') {
        document.getElementById(`trash${i}${j}`).classList.remove('d-none');
    }
}

function deleteComment(i, j) {
    posts[i]['comments'].splice(j, 1);
    posts[i]['user'].splice(j, 1);

    renderStories();
}

function saveComments(element, i) {
    let savedComments = JSON.stringify(element['comments']);
    localStorage.setItem(`comment${i}`, savedComments);
    let savedUser = JSON.stringify(element['user']);
    localStorage.setItem(`user${i}`, savedUser);
}

function saveLikes(element, i) {
    let savedLikes = JSON.stringify(element['likes']);
    localStorage.setItem(`likes${i}`, savedLikes);
    let savedLikesUser = JSON.stringify(element['userLike']);
    localStorage.setItem(`userLike${i}`, savedLikesUser);
}

function load() {
    for (let i = 0; i < posts.length; i++) {
        const element = posts[i];

        check(element, i);
    }
}

function check(element, i) {
    if (localStorage.getItem(`likes${i}`) == null) {
        saveComments(element, i);
        saveLikes(element, i);
    }
    loadComments(element, i);
    loadLikes(element, i);
}

function loadComments(element, i) {

    let savedComments = localStorage.getItem(`comment${i}`);
    let savedUser = localStorage.getItem(`user${i}`);

    element['comments'] = JSON.parse(savedComments);
    element['user'] = JSON.parse(savedUser);
}

function loadLikes(element, i) {

    let savedLikes = localStorage.getItem(`likes${i}`);
    let savedLikesUser = localStorage.getItem(`userLike${i}`);

    element['likes'] = JSON.parse(savedLikes);
    element['userLike'] = JSON.parse(savedLikesUser);
}

function isLikedPost(element, i) {
    if (element['userLike'] == true) {
        document.getElementById(`liked${i}`).innerHTML = /*html*/`
            <img onclick="dislike(${i})" src="img/png/redHeart.png">
            <img src="img/png/message.png">
            <img src="img/png/arrow.png">
        `;
    } else {
        document.getElementById(`liked${i}`).innerHTML = /*html*/`
            <img onclick="like(${i})" src="img/png/heart.png">
            <img src="img/png/message.png">
            <img src="img/png/arrow.png">
        `;
    }
}

function dislike(i) {
    posts[i]['userLike'] = false;
    posts[i]['likes'] -= 1;
    renderStories();
}

function like(i) {
    posts[i]['userLike'] = true;
    posts[i]['likes'] += 1;
    renderStories();
}