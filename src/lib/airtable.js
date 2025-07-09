const AIRTABLE_API_KEY = "patp4YZPPm5PevVUv.3bf9ad7f581b7a169a5107e12bed5c8d53863a933b6a6bc31bdfc9b6b28e48a9";
const AIRTABLE_BASE_ID = "appsIXBetnWjDbluA";

function sendToAirtable(tableName, lead) {
    console.log(`Sending lead to Airtable table "${tableName}":`, lead);
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "records": [
                {
                    "fields": lead
                }
            ]
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log('Successfully sent to Airtable:', data);
        return data;
    })
    .catch(error => {
        console.error('Error sending to Airtable:', error);
        throw error;
    });
} 