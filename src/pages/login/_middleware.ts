import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const url = req.nextUrl.clone();
    return NextResponse.rewrite(url);
}