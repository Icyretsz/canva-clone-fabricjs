import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const imagesPostSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    url: z.string()
})

export type ImagesType = z.infer<typeof imagesPostSchema>

const Images : ImagesType[] = [
    {id: 1, title: 'cat', url: 'https://media.gettyimages.com/id/1927195976/photo/portrait-of-scottish-fold-cat-lying-on-a-scratching-post.jpg?s=612x612&w=gi&k=20&c=nRSXWVAyAKciz91QvLMGDhcFU07jdBhzn32BjSzlUdA='},
    {id: 2, title: 'lion', url: 'https://media.gettyimages.com/id/2159010840/photo/kalahari-lion-cub-next-to-its-mother-stretching-in-late-afternoon-light.jpg?s=2048x2048&w=gi&k=20&c=CVMxHYCFZo-C_etZVzwPEIX6sOUjP9w601ULvGjlD9w='}
]

const imagesApp = new Hono()
    .get('/', (c) => {
        return c.json(Images)
    })
    .post('/', zValidator('json', imagesPostSchema) , async (c) => {
        const data = await c.req.valid('json')
        const images = imagesPostSchema.parse(data)
        return c.json(images)
    })
    .get('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const expense = Images.find(expense => expense.id === id)
        if (!expense) {
            return c.notFound()
        }
        return c.json({expense})
    })
    .delete('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const index = Images.findIndex(expense => expense.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const deletedImages = Images.splice(index, 1)[0]
        return c.json({expense : deletedImages})
    })

export default imagesApp
