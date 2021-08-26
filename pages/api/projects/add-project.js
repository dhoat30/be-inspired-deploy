
async function handler(req, res) {
    if (req.method === 'POST') {

        const response = await fetch('https://inspiry.co.nz/wp-json/wp/v2/projects', {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${req.body.authToken}`
            },
            redirect: 'follow'
        })

        const data = await response.json()

        res.status(201).json({ data: data })
    }

    else {
        const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/project-categories`)
        const data = await response.json()
        // const data = JSON.stringify(response)
        res.status(200).json({ data: data })
    }
}

export default handler
