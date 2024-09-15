document.addEventListener('DOMContentLoaded', function() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    const modal = document.getElementById('voteModal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close');
    let selectedCandidate = null;

    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedCandidate = this.dataset.candidate;
            modalText.textContent = `Confirm your vote for Candidate ${selectedCandidate}`;
            modal.style.display = 'block';
        });
    });
    let votes = { candidate1: 0, candidate2: 0 };
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    document.getElementById('confirm-vote').addEventListener('click', function() {
        if (selectedCandidate) {
            alert(`You voted for Candidate ${selectedCandidate}!`);
            modal.style.display = 'none';
           
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    const voteButtons = document.querySelectorAll('.vote-btn');

    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const candidate = this.dataset.candidate;
            if (candidate === "1") {
                votes.candidate1++;
                document.getElementById('candidate1-votes').textContent = votes.candidate1;
            } else if (candidate === "2") {
                votes.candidate2++;
                document.getElementById('candidate2-votes').textContent = votes.candidate2;
            }
            alert(`You voted for Candidate ${candidate}!`);
        });
    });
});
document.getElementById('searchBar').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const candidateName = card.dataset.candidateName.toLowerCase();
        if (candidateName.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
// script.js

document.getElementById('view-credits-button').addEventListener('click', function() {
    alert('Here you can manage and view your voting credits and activities.');
});


document.getElementById('profile-photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = document.getElementById('profile-image');
        img.src = e.target.result;
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
});


function incrementVoteCounter() {
    const counterElement = document.getElementById('vote-counter');
    let count = parseInt(counterElement.textContent, 10);
    counterElement.textContent = count + 1;
}

document.getElementById('vote-button').addEventListener('click', incrementVoteCounter);



   
 
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
