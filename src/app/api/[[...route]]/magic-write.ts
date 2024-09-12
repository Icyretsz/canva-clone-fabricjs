import {Hono} from 'hono';
import {auth} from '@clerk/nextjs/server'


const magicWrite = new Hono()
    .post('/default', async (ctx) => {

        if (!auth().sessionId) {
            return ctx.json({success: false, message: 'Unauthorized'}, 401);
        }

        const {textContent} = await ctx.req.json();

        if (!textContent) {
            return ctx.json({success: false, message: 'No text provided'}, 400);
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
                console.log(data.choices[0].message.content);
                return ctx.json({AIResponse: data.choices[0].message.content}, 200);
            } else {
                return ctx.json({success: false, message: 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return ctx.json({success: false, message: 'Server error'}, 500);
        }
    })

    .post('/casual', async (ctx) => {

        if (!auth().sessionId) {
            return ctx.json({success: false, message: 'Unauthorized'}, 401);
        }

        const {textContent} = await ctx.req.json();

        if (!textContent) {
            return ctx.json({success: false, message: 'No text provided'}, 400);
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
                console.log(data.choices[0].message.content);
                return ctx.json({AIResponse: data.choices[0].message.content}, 200);
            } else {
                return ctx.json({success: false, message: 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return ctx.json({success: false, message: 'Server error'}, 500);
        }
    })
    .post('/funny', async (ctx) => {

        if (!auth().sessionId) {
            return ctx.json({success: false, message: 'Unauthorized'}, 401);
        }

        const {textContent} = await ctx.req.json();

        if (!textContent) {
            return ctx.json({success: false, message: 'No text provided'}, 400);
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
                console.log(data.choices[0].message.content);
                return ctx.json({AIResponse: data.choices[0].message.content}, 200);
            } else {
                return ctx.json({success: false, message: 'No response from OpenAI'}, 500);
            }
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return ctx.json({success: false, message: 'Server error'}, 500);
        }
    });

export default magicWrite
