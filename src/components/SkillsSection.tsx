import React, { useState } from 'react';
import { PORTFOLIO_DATA, SkillItem } from '../data/portfolio';
import { JaggedProgressBar } from './JaggedProgressBar';

export const SkillsSection: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'UI/UX', 'Tools', 'AI & Tech'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-20 lg:py-28 bg-[#080808] text-[#f7f5f2] overflow-hidden select-none">
      {/* Background Halftone & Dynamic Palace Shifting */}
      <div className="absolute inset-0 bg-halftone-dynamic opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[#e60012] pb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#f7f5f2] text-[#080808] font-p5-impact text-xs tracking-widest uppercase transform rotate-2 mb-2 p5-shadow-red">
              CHAPTER 02 // ARSENAL INVENTORY
            </div>
            <h2 className="font-p5-display text-4xl sm:text-6xl font-bold tracking-wider text-[#f7f5f2]">
              SKILL <span className="text-[#e60012]">DECK</span>
            </h2>
          </div>
          <p className="font-p5-mono text-xs text-[#b9b9b9] max-w-sm">
            SELECT A SKILL CARD TO INSPECT COMBAT ATTRIBUTES &amp; TECHNICAL AFFINITIES.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Functional Buttons adhering to frontend-design) */}
        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist" aria-label="Skill Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 font-p5-impact text-sm tracking-wider uppercase transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                selectedCategory === cat
                  ? 'bg-[#e60012] text-[#080808] -rotate-2 p5-shadow-black'
                  : 'bg-[#171717] text-[#b9b9b9] hover:text-[#f7f5f2] hover:bg-[#242424] border border-[#2a2a2a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Card Grid (Asymmetrical Persona 5 Card Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => {
            const isSelected = activeSkill?.name === skill.name;
            const rotations = [-1.5, 1, -2, 1.5, -1, 2];
            const cardRotation = rotations[idx % rotations.length];

            return (
              <div
                key={skill.name}
                tabIndex={0}
                role="button"
                aria-label={`Skill card: ${skill.name}. Level: ${skill.level}. ${skill.description}`}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSkill(isSelected ? null : skill);
                  }
                }}
                className={`group relative p-5 bg-[#141414] border-2 transition-all duration-200 cursor-pointer p5-cut-corner select-none focus-visible:outline-2 focus-visible:outline-[#ff1b2d] ${
                  isSelected
                    ? 'border-[#ff1b2d] bg-[#1a0507] -translate-y-2 p5-shadow-white z-20'
                    : 'border-[#242424] hover:border-[#e60012] hover:-translate-y-1 p5-shadow-black'
                }`}
                style={{
                  transform: isSelected ? 'scale(1.02)' : `rotate(${cardRotation}deg)`,
                }}
              >
                {/* Element & Level Header */}
                <div className="flex items-center justify-between border-b border-[#242424] pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#e60012] rotate-45 inline-block" />
                    <span className="font-p5-impact text-xs tracking-widest text-[#ff1b2d] uppercase">
                      {skill.element}
                    </span>
                  </div>
                  <span className="font-p5-mono text-[11px] font-bold text-[#b9b9b9]">
                    {skill.level}
                  </span>
                </div>

                {/* Skill Title */}
                <h3 className="font-p5-display text-2xl font-bold text-[#f7f5f2] group-hover:text-[#ff1b2d] transition-colors tracking-wide mb-2">
                  {skill.name}
                </h3>

                {/* Unboxed Metadata (Category · Tag) */}
                <div className="flex items-center gap-2 text-xs font-p5-mono text-[#b9b9b9] mb-3">
                  <span>{skill.category}</span>
                  <span aria-hidden="true" className="text-[#e60012]">/</span>
                  <span className="text-[#f7f5f2]">{skill.tag}</span>
                </div>

                {/* Description */}
                <p className="font-p5-body text-xs text-[#a0a0a0] leading-relaxed mb-3">
                  {skill.description}
                </p>

                {/* Stylized Jagged-Edged Progress Bar (Animates upon scroll-in with p5-reveal pattern) */}
                <JaggedProgressBar
                  value={skill.proficiency}
                  label="COMBAT MASTERY"
                  delay={idx * 60}
                  className="my-3"
                />

                {/* Action Indicator */}
                <div className="mt-3 pt-2 border-t border-[#1f1f1f] flex justify-between items-center text-[10px] font-p5-mono text-[#e60012]">
                  <span>{isSelected ? "CARD ACTIVE" : "TAP TO ENGAGE"}</span>
                  <span>{isSelected ? "▲" : "▼"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Detail Banner */}
        {activeSkill && (
          <div className="mt-8 p-6 bg-[#e60012] text-[#080808] border-3 border-[#080808] p5-cut-corner-lg p5-shadow-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fadeIn">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-p5-mono text-xs font-bold uppercase tracking-wider mb-1">
                <span>SKILL ANALYSIS</span>
                <span>·</span>
                <span>{activeSkill.element} TYPE</span>
                <span>·</span>
                <span>TIER: {activeSkill.level}</span>
              </div>
              <h4 className="font-p5-display text-3xl font-bold tracking-wide">
                {activeSkill.name}: {activeSkill.tag}
              </h4>
              <p className="font-p5-body text-sm font-medium mt-1 max-w-3xl">
                {activeSkill.description}
              </p>

              {/* Active Skill Jagged Progress Bar */}
              <div className="mt-3 max-w-sm">
                <JaggedProgressBar
                  value={activeSkill.proficiency}
                  label="ACTIVE DECK POWER INDEX"
                  className="mt-2"
                />
              </div>
            </div>
            <button
              onClick={() => setActiveSkill(null)}
              className="px-4 py-2 bg-[#080808] text-[#f7f5f2] font-p5-impact text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer"
            >
              CLOSE [X]
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
