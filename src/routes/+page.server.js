import { redirect } from '@sveltejs/kit'

export const load = async ({ url }) => {
    if (url.searchParams.has('passport')) {
        await fetch('https://id.purduehackers.com/api/scan', {
            'method': 'POST',
            'body': JSON.stringify({
                'id': parseInt(process.env.PH_PASSPORT_ID ?? '0'),
                'secret': process.env.PH_PASSPORT_SECRET ?? 'NOSECRET',
            })
        })

        url.searchParams.delete('passport')
        if (url.searchParams.size == 0) {
            throw redirect(302, url.href)
        }
        throw redirect(302, `${url.href}?${url.searchParams.toString()}`)
    }
}
