import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AuthAwareLink } from "@/components/ui";
import { prisma } from "@/lib/prisma";
import { GENRES } from "@/features/games/schemas";
import { getDeveloperCount } from "@/features/games/queries/games";

export const metadata: Metadata = {
  title: "About — PlayVault",
  description:
    "PlayVault is a community-driven game discovery platform built by itsw1n.",
};

export default async function AboutPage() {
  const [gamesCount, devCount, playerCount] = await Promise.all([
    prisma.game.count(),
    getDeveloperCount(),
    prisma.user.count(),
  ]);
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-6">
      {/* Hero */}
      <div className="bg-pv-primary border-[2.5px] border-pv-border rounded-pv p-6">
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#111111] uppercase">
          About PlayVault
        </p>
        <h1 className="font-display font-extrabold text-[26px] leading-[1.15] text-[#111111] mt-1.5 mb-2.5">
          A hub for games built by real people.
        </h1>
        <p className="text-[13px] text-[#111111] leading-[1.6] max-w-[480px]">
          PlayVault is a community-driven discovery platform. Developers publish
          their games here. Players find, favorite, and launch them. No
          gatekeepers. No fees. Just games.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { num: gamesCount.toLocaleString(), label: "GAMES LIVE" },
          { num: devCount.toLocaleString(), label: "DEVELOPERS" },
          { num: playerCount.toLocaleString(), label: "PLAYERS" },
        ].map((s) => (
          <div
            key={s.label}
            className="border-[2.5px] border-pv-border rounded-pv p-3.5 text-center bg-pv-card"
          >
            <span className="font-display font-extrabold text-[26px] text-pv-primary block mb-0.5">
              {s.num}
            </span>
            <span className="text-[11px] font-bold tracking-[0.05em] text-pv-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* The person behind this */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-2.5">
          The person behind this
        </p>
        <div className="border-[2.5px] border-pv-border rounded-pv p-4 bg-pv-card flex gap-3.5 items-start">
          <div className="w-[52px] h-[52px] bg-pv-primary border-[2.5px] border-pv-border rounded-pv flex items-center justify-center font-display font-extrabold text-[18px] text-[#111111] shrink-0">
            W
          </div>
          <div>
            <h2 className="font-display font-bold text-[15px] text-pv-text mb-1">
              itsw1n
            </h2>
            <p className="text-[12px] text-pv-muted leading-[1.6] mb-2">
              IT student and self-taught developer building projects to learn,
              one at a time. PlayVault started as a way to put games somewhere
              permanent — not buried in social feeds or stuck behind store
              approvals.
            </p>
            <p className="text-[12px] text-pv-muted leading-[1.6]">
              I build by learning. Every project teaches me something the last
              one didn&apos;t. PlayVault is one of those projects.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Why I built this */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-2.5">
          Why I built this
        </p>
        <div className="border-[2.5px] border-pv-border rounded-pv p-4 bg-pv-card">
          <p className="text-[13px] text-pv-muted leading-[1.6]">
            Independent game developers build incredible things and have nowhere
            obvious to show them. Big stores charge fees and have approval
            queues. Social media buries links. I wanted a permanent, browsable
            home for games that don&apos;t need a publisher — and building it
            was a good way to learn too.
          </p>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* How it works */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-2.5">
          How it works
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              num: "1",
              title: "Developers publish",
              body: "Any registered user can submit a game — title, thumbnail, description, genre, and a link to where the game lives. PlayVault never hosts game files.",
            },
            {
              num: "2",
              title: "Players discover",
              body: "Browse by genre, search by title, or explore Featured and Trending. No account needed to look around.",
            },
            {
              num: "3",
              title: "Launch and favorite",
              body: "Sign in to play or save a game. Play opens the developer's site in a new tab — PlayVault stays open in the original.",
            },
          ].map((step) => (
            <div key={step.num} className="flex gap-3 items-start">
              <div className="w-7 h-7 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-pv-sm flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                {step.num}
              </div>
              <div>
                <h3 className="font-display font-bold text-[14px] text-pv-text mb-0.5">
                  {step.title}
                </h3>
                <p className="text-[12px] text-pv-muted leading-[1.6]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* What I'm not building */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-2.5">
          What I&apos;m not building
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              icon: "ti-device-gamepad-2",
              title: "Not a game engine",
              body: "I don't build or host your game. I just give it a home in the catalog.",
            },
            {
              icon: "ti-building-store",
              title: "Not a store",
              body: "No payments, no purchases, no revenue share. All games are free to discover.",
            },
            {
              icon: "ti-shield",
              title: "Not a gatekeeper",
              body: "No approval queue. If you have a game and a link, you can publish it today.",
            },
            {
              icon: "ti-ad",
              title: "Not ad-supported",
              body: "No tracking pixels, no ad networks, no promoted listings.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-[2.5px] border-pv-border rounded-pv p-4 bg-pv-card"
            >
              <i
                className={`ti ${item.icon} text-[20px] text-pv-primary mb-1.5 block`}
                aria-hidden="true"
              />
              <h3 className="font-display font-bold text-[13px] text-pv-text mb-1">
                {item.title}
              </h3>
              <p className="text-[12px] text-pv-muted leading-[1.6]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Note for itsw1n */}
      <section>
        <div className="border-[2.5px] border-pv-primary rounded-pv p-4 bg-pv-card flex gap-2.5 items-start">
          <i
            className="ti ti-plant-2 text-[22px] text-pv-primary shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-display font-bold text-[14px] text-pv-text mb-1.5">
              Keep going, brudaA.
            </h2>
            <p className="text-[12px] text-pv-muted leading-[1.6]">
              You&apos;re still early in the learning curve and that&apos;s
              exactly where the most important growth happens. Every concept
              that feels confusing right now is one you&apos;ll understand
              deeply later — because you worked through it, not around it.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Genres */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-2.5">
          Genres on the platform
        </p>
        <div className="flex flex-wrap gap-1.5">
          {GENRES.map((g) => (
            <span
              key={g}
              className="inline-block border-[2px] border-pv-border rounded-pv-sm px-2 py-0.5 text-[11px] font-bold tracking-[0.04em] text-pv-text"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-t-[2.5px] border-pv-border" />

      {/* Find me */}
      <section>
        <p className="text-[11px] font-bold tracking-[0.08em] text-pv-primary uppercase mb-1.5">
          Find me
        </p>
        <p className="text-[12px] text-pv-muted leading-[1.6] mb-4">
          GitHub, LinkedIn, and Facebook links are in the footer below.
        </p>
      </section>

      {/* CTA */}
      <div className="border-[2.5px] border-pv-border rounded-pv p-4 bg-pv-primary flex items-center justify-between gap-3">
        <div>
          <p className="font-display font-extrabold text-[16px] text-[#111111]">
            Ready to publish your game?
          </p>
          <p className="text-[12px] text-[#111111] mt-1">
            Create a free account and add your game in under 2 minutes.
          </p>
        </div>
        <Button variant="inactive" className="text-xs" asChild>
          <AuthAwareLink href="/sign-up">GET STARTED</AuthAwareLink>
        </Button>
      </div>
    </div>
  );
}
