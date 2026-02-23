function scrollToHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('recommendationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('recommenderName').value;
    const position = document.getElementById('recommenderPosition').value;
    const recommendation = document.getElementById('recommendationText').value;

    const confirmed = confirm(`Thank you for your recommendation!\n\nName: ${name}\nPosition: ${position}\n\nYour recommendation has been submitted successfully.`);

    if (confirmed) {
        const newCard = document.createElement('div');
        newCard.className = 'recommendation-card';
        newCard.innerHTML = `
            <h4>${name}</h4>
            <div class="position">${position}</div>
            <p>"${recommendation}"</p>
        `;

        document.getElementById('recommendationsList').insertBefore(newCard, document.getElementById('recommendationsList').firstChild);

        document.getElementById('recommendationForm').reset();

        alert('Recommendation added successfully!');
    }
});