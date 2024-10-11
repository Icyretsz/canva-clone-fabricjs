import {Hono} from 'hono';
import {auth} from '@clerk/nextjs/server'
import {clerkMiddleware, getAuth} from "@hono/clerk-auth";


const magicWrite = new Hono()
    .post('/default', clerkMiddleware(), async (c) => {

        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }

        const {textContent} = await c.req.json();

        if (!textContent) {
            return c.json({error : 'No text provided'}, 400);
        }

        const APIBody = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You will be provided with statements, and your task is to expand the topic with maximum 40 words.'
                },
                {
                    role: 'user',
                    content: textContent
                }
            ],
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`
                },
                body: JSON.stringify(APIBody)
            });

            const data = await response.json();

            if (data.choices && data.choices[0].message.content) {
                return c.json({AIResponse: data.choices[0].message.content});
            } else {
                return c.json({error : 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return c.json({error : 'Server error'}, 500);
        }
    })

    .post('/casual', clerkMiddleware(), async (c) => {

        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }

        const {textContent} = await c.req.json();

        if (!textContent) {
            return c.json({error : 'No text provided'}, 400);
        }

        const APIBody = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You will be provided with statements, and your task is to expand the topic in a casual way with maximum 40 words.'
                },
                {
                    role: 'user',
                    content: textContent
                }
            ],
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`
                },
                body: JSON.stringify(APIBody)
            });

            const data = await response.json();

            if (data.choices && data.choices[0].message.content) {
                return c.json({AIResponse: data.choices[0].message.content});
            } else {
                return c.json({error : 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return c.json({error : 'Server error'}, 500);
        }
    })
    .post('/funny', clerkMiddleware(), async (c) => {

        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }

        const {textContent} = await c.req.json();

        if (!textContent) {
            return c.json({error : 'No text provided'}, 400);
        }

        const APIBody = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You will be provided with statements, and your task is to expand the topic in a humorous way with maximum 40 words.'
                },
                {
                    role: 'user',
                    content: textContent
                }
            ],
            temperature: 0.9,
            max_tokens: 100,
            top_p: 1
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`
                },
                body: JSON.stringify(APIBody)
            });

            const data = await response.json();

            if (data.choices && data.choices[0].message.content) {
                return c.json({AIResponse: data.choices[0].message.content});
            } else {
                return c.json({error : 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return c.json({error : 'Server error'}, 500);
        }
    })
    .post('/spelling', clerkMiddleware(), async (c) => {

        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }

        const {textContent} = await c.req.json();

        if (!textContent) {
            return c.json({error : 'No text provided'}, 400);
        }

        const APIBody = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You will be provided with statements, and your task is to correct grammar/ spelling errors.'
                },
                {
                    role: 'user',
                    content: textContent
                }
            ],
            temperature: 0.9,
            max_tokens: 100,
            top_p: 1
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`
                },
                body: JSON.stringify(APIBody)
            });

            const data = await response.json();

            if (data.choices && data.choices[0].message.content) {
                return c.json({AIResponse: data.choices[0].message.content});
            } else {
                return c.json({error : 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return c.json({error : 'Server error'}, 500);
        }
    });

export default magicWrite
