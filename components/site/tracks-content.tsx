'use client';

import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

interface Track {
  name: string;
  location: string;
  surface: string;
  website?: string;
}

const tracks: Track[] = [
  {
    name: '5280 Raceway - CORRC',
    location: 'Lakewood, CO',
    surface: 'Indoor Carpet',
  },
  {
    name: '997 RC Raceway',
    location: 'Waynesboro, PA',
    surface: 'Indoor Carpet',
  },
  {
    name: 'Adrenaline RC Racing LLC & Hobby',
    location: 'Winchester, VA',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'Bad Fast Hobbies',
    location: 'Sioux City, IA',
    surface: 'Indoor Carpet',
  },
  {
    name: 'Beachline Raceway R/C',
    location: 'Cocoa, FL',
    surface: 'Indoor Carpet',
  },
  {
    name: 'Coastal RC Speedway and Hobbies',
    location: 'Chesapeake, VA',
    surface: 'Indoor Carpet',
    website: 'https://coastalrchobbies.com',
  },
  {
    name: 'Coyote Hobbies and Raceway',
    location: 'Victorville, CA',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'Dirt Burner Hobbies and Raceway',
    location: 'Livonia, MI',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: "Eaton's Intermountain RC Raceway",
    location: 'Salt Lake City, UT',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'EN Hobbies',
    location: 'Columbus, OH',
    surface: 'Indoor Carpet',
  },
  {
    name: 'Fastlane Raceway LLC',
    location: 'Blue Springs, MO',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'First State Hobbies',
    location: 'Newark, DE',
    surface: 'Indoor Carpet',
  },
  {
    name: 'Hobby Action RC Raceway and Shop Chandler',
    location: 'Chandler, AZ',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'HobbyTown',
    location: 'Omaha, NE',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: "Larry's Performance RC",
    location: 'Shelby Township, MI',
    surface: 'Indoor Carpet',
  },
  {
    name: "Larry's Performance RC",
    location: 'Shelby Township, MI',
    surface: 'Turf',
  },
  {
    name: 'Limitless R/C',
    location: 'Millington, MI',
    surface: 'Indoor Carpet',
  },
  {
    name: 'MHOR R/C Raceway',
    location: 'Aurora, CO',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'MHOR R/C Raceway',
    location: 'Aurora, CO',
    surface: 'Turf',
  },
  {
    name: 'Nor-Cal Hobbies & Raceway',
    location: 'San Jose, CA',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: "Rainman's Hobby and Raceway",
    location: 'Bakersfield, CA',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'RC One Racing',
    location: 'Macomb, MI',
    surface: 'Indoor Carpet',
    website: 'https://rconeracing.com',
  },
  {
    name: 'Rhythm RC Raceway',
    location: 'Hammonton, NJ',
    surface: 'Indoor Carpet',
  },
  {
    name: 'SD RC Raceway',
    location: 'San Diego, CA',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'SS Hobbies & Raceway',
    location: 'Tampa, FL',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'The Track',
    location: 'Gaithersburg, MD',
    surface: 'Indoor Dirt/Clay',
  },
  {
    name: 'Whip It RC Raceway & Hobbies',
    location: 'Reno, NV',
    surface: 'Indoor Dirt/Clay',
  },
];

const surfaceFilters = ['All', 'Indoor Dirt/Clay', 'Indoor Carpet', 'Outdoor Dirt', 'Turf'];

// Map state abbreviations to full names
const stateMap: Record<string, string> = {
  'AZ': 'Arizona',
  'CA': 'California',
  'CO': 'Colorado',
  'DE': 'Delaware',
  'FL': 'Florida',
  'IA': 'Iowa',
  'MD': 'Maryland',
  'MI': 'Michigan',
  'MO': 'Missouri',
  'NE': 'Nebraska',
  'NJ': 'New Jersey',
  'NV': 'Nevada',
  'OH': 'Ohio',
  'PA': 'Pennsylvania',
  'UT': 'Utah',
  'VA': 'Virginia',
};

// Convert location with abbreviation to include full state name for searching
function getSearchableLocation(location: string): string {
  const parts = location.split(', ');
  if (parts.length === 2) {
    const [city, state] = parts;
    const fullState = stateMap[state];
    if (fullState) {
      return `${city}, ${state} ${fullState}`.toLowerCase();
    }
  }
  return location.toLowerCase();
}

export function TracksContent() {
  const [search, setSearch] = useState('');
  const [surfaceFilter, setSurfaceFilter] = useState('All');

  const filtered = tracks.filter((track) => {
    const searchLower = search.toLowerCase();
    const searchableLocation = getSearchableLocation(track.location);
    
    const matchesSearch =
      search === '' ||
      track.name.toLowerCase().includes(searchLower) ||
      searchableLocation.includes(searchLower);
    
    const matchesSurface = surfaceFilter === 'All' || track.surface === surfaceFilter;
    return matchesSearch && matchesSurface;
  });

  return (
    <>
      {/* Search and filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by track name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#111] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
          />
        </div>
        <select
          value={surfaceFilter}
          onChange={(e) => setSurfaceFilter(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#111] px-4 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
        >
          {surfaceFilters.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Surfaces' : s}
            </option>
          ))}
        </select>
      </div>

      {/* Track listing */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#111] py-20 text-center">
          <p className="text-gray-500">
            {tracks.length === 0
              ? 'No tracks listed yet. Know a track that should be here?'
              : 'No tracks match your search.'}
          </p>
          {tracks.length === 0 && (
            <a
              href="/submit"
              className="mt-4 inline-block text-sm font-medium text-yokomo-blue hover:underline"
            >
              Submit a track &rarr;
            </a>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((track, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/20"
            >
              <h3 className="mb-1 font-semibold text-white">{track.name}</h3>
              <p className="mb-1 text-sm text-gray-400">{track.location}</p>
              <span className="mb-3 inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-gray-500">
                {track.surface}
              </span>
              {track.website && (
                <a
                  href={track.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1 text-sm font-medium text-yokomo-blue hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
