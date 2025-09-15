function markdownToPlainText(markdown) {
    // Remove hyperlinks
    const strippedMarkdown = markdown.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
                                      .replace(/<img[^>]*>/g, ''); // Remove HTML image tags

    // Remove code blocks (single and triple backticks)
    const noCodeBlocks = strippedMarkdown.replace(/`{3}[\s\S]*?`{3}/g, '') // Triple backticks
                                          .replace(/`([^`]+)`/g, '$1'); // Single backticks

    // Convert markdown to plain text
    const lines = noCodeBlocks.split('\n');
    const plainTextLines = lines.map(line => {
        // Preserve bullet points
        if (line.startsWith('* ')) {
            return line; // Keep bullet points
        }
        // Replace other markdown formatting (like headers, italic, bold)
        return line.replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
                    .replace(/(\*|_)(.*?)\1/g, '$2') // Italics
                    .replace(/#{1,6}\s?/, ''); // Headers
    });

    // Join lines with line breaks
    return plainTextLines.join('\n').trim();
}

function textToNewWindowDocument(text) {
    const newWindow = window.open('', '_blank');
    newWindow.document = new Document();
    newWindow.document.write('<html><head><title>Bookmarklet Output</title></head><body>');
    newWindow.document.write('<pre>' + text + '</pre>'); // Use <pre> to preserve formatting
    newWindow.document.write('</body></html>');
    newWindow.document.close(); // Close the document to render it
}

// Function to get markdown input from a popup and convert it
const markdownInput = prompt("Please enter your GitHub-flavored markdown:");
if (markdownInput) {
    const plainTextOutput = markdownToPlainText(markdownInput);
    textToNewWindowDocument(plainTextOutput);
} else {
    alert("No input provided.");
}