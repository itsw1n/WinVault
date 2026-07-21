import type { Metadata } from 'next'
import { Button, AuthAwareLink } from '@/components/ui'
import { prisma } from '@/lib/prisma'
import { GENRES } from '@/features/games/schemas'
import { getDeveloperCount } from '@/features/games/server/queries'

export const metadata: Metadata = {
  title: 'About — PlayVault',
  description: 'PlayVault is a community-driven game discovery platform built by itsw1n.',
}

export default async function AboutPage() {
  const [gamesCount, devCount, playerCount] = await Promise.all([
    prisma.game.count(),
    getDeveloperCount(),
    prisma.user.count(),
  ])
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-8">
      {/* Hero */}
      <div className="rounded-pv border-[2.5px] border-pv-border bg-pv-primary p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111]">
          About PlayVault
        </p>
        <h1 className="mb-2.5 mt-1.5 font-display text-[26px] font-extrabold leading-[1.15] text-[#111111]">
          A hub for games built by real people.
        </h1>
        <p className="max-w-[480px] text-[13px] leading-[1.6] text-[#111111]">
          PlayVault is a community-driven discovery platform. Developers publish their games here.
          Players find, favorite, and launch them. No gatekeepers. No fees. Just games.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { num: gamesCount.toLocaleString(), label: 'GAMES LIVE' },
          { num: devCount.toLocaleString(), label: 'DEVELOPERS' },
          { num: playerCount.toLocaleString(), label: 'PLAYERS' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-pv border-[2.5px] border-pv-border bg-pv-card p-3.5 text-center"
          >
            <span className="mb-0.5 block font-display text-[26px] font-extrabold text-pv-primary">
              {s.num}
            </span>
            <span className="text-[11px] font-bold tracking-[0.05em] text-pv-muted">{s.label}</span>
          </div>
        ))}
      </div>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* The person behind this */}
      <section>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          The person behind this
        </p>
        <div className="flex items-start gap-3.5 rounded-pv border-[2.5px] border-pv-border bg-pv-card p-4">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-pv border-[2.5px] border-pv-border bg-pv-primary font-display text-[18px] font-extrabold text-[#111111]">
            W
          </div>
          <div>
            <h2 className="mb-1 font-display text-[15px] font-bold text-pv-text">itsw1n</h2>
            <p className="mb-2 text-[12px] leading-[1.6] text-pv-muted">
              IT student and self-taught developer building projects to learn, one at a time.
              PlayVault started as a way to put games somewhere permanent — not buried in social
              feeds or stuck behind store approvals.
            </p>
            <p className="text-[12px] leading-[1.6] text-pv-muted">
              I build by learning. Every project teaches me something the last one didn&apos;t.
              PlayVault is one of those projects.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Why I built this */}
      <section>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          Why I built this
        </p>
        <div className="rounded-pv border-[2.5px] border-pv-border bg-pv-card p-4">
          <p className="text-[13px] leading-[1.6] text-pv-muted">
            Independent game developers build incredible things and have nowhere obvious to show
            them. Big stores charge fees and have approval queues. Social media buries links. I
            wanted a permanent, browsable home for games that don&apos;t need a publisher — and
            building it was a good way to learn too.
          </p>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* How it works */}
      <section>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          How it works
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              num: '1',
              title: 'Developers publish',
              body: 'Any registered user can submit a game — title, thumbnail, description, genre, and a link to where the game lives. PlayVault never hosts game files.',
            },
            {
              num: '2',
              title: 'Players discover',
              body: 'Browse by genre, search by title, or explore Featured and Trending. No account needed to look around.',
            },
            {
              num: '3',
              title: 'Launch and favorite',
              body: "Sign in to play or save a game. Play opens the developer's site in a new tab — PlayVault stays open in the original.",
            },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pv-sm bg-[#111111] text-[12px] font-bold text-white dark:bg-white dark:text-[#111111]">
                {step.num}
              </div>
              <div>
                <h3 className="mb-0.5 font-display text-[14px] font-bold text-pv-text">
                  {step.title}
                </h3>
                <p className="text-[12px] leading-[1.6] text-pv-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* What I'm not building */}
      <section>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          What I&apos;m not building
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              icon: 'ti-device-gamepad-2',
              title: 'Not a game engine',
              body: "I don't build or host your game. I just give it a home in the catalog.",
            },
            {
              icon: 'ti-building-store',
              title: 'Not a store',
              body: 'No payments, no purchases, no revenue share. All games are free to discover.',
            },
            {
              icon: 'ti-shield',
              title: 'Not a gatekeeper',
              body: 'No approval queue. If you have a game and a link, you can publish it today.',
            },
            {
              icon: 'ti-ad',
              title: 'Not ad-supported',
              body: 'No tracking pixels, no ad networks, no promoted listings.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-pv border-[2.5px] border-pv-border bg-pv-card p-4"
            >
              <i
                className={`ti ${item.icon} mb-1.5 block text-[20px] text-pv-primary`}
                aria-hidden="true"
              />
              <h3 className="mb-1 font-display text-[13px] font-bold text-pv-text">{item.title}</h3>
              <p className="text-[12px] leading-[1.6] text-pv-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Note for itsw1n */}
      <section>
        <div className="flex items-start gap-2.5 rounded-pv border-[2.5px] border-pv-primary bg-pv-card p-4">
          <i
            className="ti ti-plant-2 mt-0.5 shrink-0 text-[22px] text-pv-primary"
            aria-hidden="true"
          />
          <div>
            <h2 className="mb-1.5 font-display text-[14px] font-bold text-pv-text">
              Keep going, brudaA.
            </h2>
            <p className="text-[12px] leading-[1.6] text-pv-muted">
              You&apos;re still early in the learning curve and that&apos;s exactly where the most
              important growth happens. Every concept that feels confusing right now is one
              you&apos;ll understand deeply later — because you worked through it, not around it.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Genres */}
      <section>
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          Genres on the platform
        </p>
        <div className="flex flex-wrap gap-1.5">
          {GENRES.map((g) => (
            <span
              key={g}
              className="inline-block rounded-pv-sm border-[2px] border-pv-border px-2 py-0.5 text-[11px] font-bold tracking-[0.04em] text-pv-text"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Find me */}
      <section>
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-pv-primary">
          Find me
        </p>
        <p className="mb-4 text-[12px] leading-[1.6] text-pv-muted">
          GitHub, LinkedIn, and Facebook links are in the footer below.
        </p>
      </section>

      {/* CTA */}
      <div className="flex items-center justify-between gap-3 rounded-pv border-[2.5px] border-pv-border bg-pv-primary p-4">
        <div>
          <p className="font-display text-[16px] font-extrabold text-[#111111]">
            Ready to publish your game?
          </p>
          <p className="mt-1 text-[12px] text-[#111111]">
            Create a free account and add your game in under 2 minutes.
          </p>
        </div>
        <Button variant="inactive" className="text-xs" asChild>
          <AuthAwareLink href="/sign-up">GET STARTED</AuthAwareLink>
        </Button>
      </div>
    </div>
  )
}
