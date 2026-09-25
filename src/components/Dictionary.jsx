import axios from 'axios';
import { useRef, useState } from 'react'
import { HiSearch } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'sonner'
import { HiOutlineBookOpen, HiOutlineDocumentText } from "react-icons/hi"
import { HiSpeakerWave } from "react-icons/hi2"
import MusicPlayer from './MusicPlayer';
import emptyStateIcon from '../assets/images/empty_state_icon.svg'

const Dictionary = () => {
    const [value, setValue] = useState('')
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)

    // clearning text
    const handleClear = () => {
        setValue('');
        setResult(null);
        inputRef.current.focus();
    }

    // Getting meaning for the word
    const getMeaning = async () => {
        if (!value) return;
        setLoading(true)
        setResult(null);
        try {
            const response = await axios.get(`https://englishdictionaryapi.com/api/v1/words/${value}`)
            setResult(response.data);
        } catch (error) {
            console.log('Error while getting meaning (API error)', error)
            toast.error('The word you entered is not valid, please enter a correct word')
        }
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => { clearTimeout(timeout) }
    }

    // Playing audio
    const playAudio = () => {
        if (!result?.pronunciation?.audioUrl) return
        new Audio(result.pronunciation.audioUrl).play()
    }

    // Part of Speech style
    const posStyle = {
        adj: { label: "Adjective", badge: "bg-violet-100 text-violet-700", quote: "bg-blue-50 text-violet-700" },
        adjective: { label: "Adjective", badge: "bg-violet-100 text-violet-700", quote: "bg-blue-50 text-violet-700" },
        noun: { label: "Noun", badge: "bg-emerald-100 text-emerald-700", quote: "bg-emerald-50 text-emerald-800" },
        verb: { label: "Verb", badge: "bg-sky-100 text-sky-700", quote: "bg-sky-50 text-sky-800" },
        intj: { label: "Interjection", badge: "bg-amber-100 text-amber-700", quote: "bg-amber-50 text-amber-800" },
        adv: { label: "Adverb", badge: "bg-rose-100 text-rose-700", quote: "bg-rose-50 text-rose-800" },
    }

    // Handling enter key is pressed
    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            getMeaning();
        }
    }

    return (
        <div className='flex flex-col gap-8 justify-center items-center py-10'>
            {/* input */}
            <div className='flex justify-center items-center gap-4 bg-white px-5 py-3 rounded-4xl lg:w-170 md:w-full sm:w-full w-full shadow-lg'>
                <HiSearch className='text-xl' />
                <input type="text" ref={inputRef} className='hover:outline-none focus:outline-none w-full inter-font' placeholder='Search word' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}/>
                {
                    value && <button type='button' onClick={handleClear} className='hover:cursor-pointer'>
                        <RxCross2 />
                    </button>
                }
                <button className='bg-blue-500 text-white text-sm font-medium px-5 py-1.5 rounded-2xl' onClick={getMeaning}>Search</button>
            </div>
            
            {/* Loading section */}
            {loading && (
                <div className="flex w-full justify-center rounded-3xl bg-white px-8 py-16 shadow-xl lg:w-170">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
                </div>
            )}

            {/* Meaning section */}
            {result !== null && !loading && (
                <div className="bg-white w-full lg:max-w-2xl md:max-w-2xl sm:w-full rounded-3xl p-8 shadow-xl flex flex-col gap-5">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 pt-serif-font capitalize">
                            {result.word}
                        </h2>
                        {result.pronunciation?.ipa && (
                            <div className="mt-2 flex items-center gap-2">
                                <p className="text-lg text-indigo-500 inter-font">{result.pronunciation.ipa}</p>
                            </div>
                        )}
                    </div>

                    {result.etymology && (
                        <div className="flex gap-3 rounded-2xl bg-blue-50 px-4 py-3">
                            <HiOutlineBookOpen className="mt-0.5 shrink-0 text-xl text-indigo-500" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Word origin</p>
                                <p className="text-sm text-slate-500 line-clamp-2">
                                    {result.etymology.split(".")[0]}
                                </p>
                            </div>
                        </div>
                    )}

                    {(result.hyphenation || result.forms?.length > 0) && (
                        <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm text-slate-500">
                            {result.hyphenation && (
                                <p>
                                    <span className="font-medium text-slate-600">Syllables: </span>
                                    {String(result.hyphenation).replaceAll("-", " · ")}
                                </p>
                            )}
                            {result.forms?.length > 0 && (
                                <p>
                                    <span className="font-medium text-slate-600">Word forms: </span>
                                    {result.forms.slice(0, 4).join(" | ")}
                                </p>
                            )}
                        </div>
                    )}

                    {result.pronunciation?.audioUrl && (
                        <MusicPlayer src={result.pronunciation.audioUrl} />
                    )}

                    <div className="flex flex-col">
                        {result.partsOfSpeech?.map((item, index) => {
                            const sense = item.senses?.[0]
                            if (!sense) return null
                            const style = posStyle[item.partOfSpeech] ?? {
                                label: item.partOfSpeech,
                                badge: "bg-slate-100 text-slate-600",
                                quote: "bg-slate-50 text-slate-500",
                            }

                            return (
                                <div key={item.partOfSpeech} className="border-b border-slate-100 py-4 last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                                        ●
                                        </span>
                                        <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${style.badge}`}>
                                            {style.label}
                                        </span>
                                    </div>
                                    <p className="mt-3 font-medium text-slate-800">{sense.definition}</p>
                                    {sense.example && (
                                        <p className={`mt-3 rounded-xl px-4 py-3 text-sm italic leading-relaxed ${style.quote}`}>
                                            “{sense.example}”
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {(result.synonyms?.length > 0 || result.antonyms?.length > 0) && (
                        <div className="grid gap-3 md:grid-cols-2">
                            {result.synonyms?.length > 0 && (
                                <div className="rounded-2xl bg-emerald-50 p-4">
                                    <h3 className="mb-3 text-sm font-semibold text-emerald-800">Synonyms</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.synonyms.slice(0, 6).map((word) => (
                                            <span key={word} className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-sm text-slate-600">
                                                {word}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {result.antonyms?.length > 0 && (
                                <div className="rounded-2xl bg-rose-50 p-4">
                                    <h3 className="mb-3 text-sm font-semibold text-rose-700">Antonyms</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.antonyms.slice(0, 6).map((word) => (
                                            <span key={word} className="rounded-full border border-rose-100 bg-white px-3 py-1 text-sm text-slate-600">
                                                {word}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Empty state section */}
            {result === null && !loading && (
                <div className="bg-white w-full lg:w-170 rounded-3xl px-8 py-10 shadow-xl flex flex-col justify-center items-center gap-3 text-center">
                    <img src={emptyStateIcon} alt="" className="mx-auto w-20 " />

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 pt-serif-font">
                        Ready to explore?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-slate-500 inter-font leading-relaxed">
                        Enter any word in the search box above to unlock instant phonetic pronunciations, comprehensive definitions, and contextual examples.
                    </p>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
                            Trending searches today
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center gap-2">
                            {['serendipity', 'ephemeral', 'mellifluous', 'resilient', 'solitude'].map((word) => (
                                <button
                                    key={word}
                                    type="button"
                                    onClick={() => getMeaning(word)}
                                    className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600"
                                >
                                    {word}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-left">
                            <span className="rounded-xl bg-violet-100 p-2 text-violet-500">
                                <HiSpeakerWave className="text-xl" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Audio Clips</p>
                                <p className="text-xs text-slate-400">Helps to pronounce the word correctly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-left">
                            <span className="rounded-xl bg-blue-100 p-2 text-blue-500">
                                <HiOutlineBookOpen className="text-xl" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Definitions</p>
                                <p className="text-xs text-slate-400">Helps to understand the word</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-left">
                            <span className="rounded-xl bg-emerald-100 p-2 text-emerald-500">
                                <HiOutlineDocumentText className="text-xl" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Context</p>
                                <p className="text-xs text-slate-400">Helps to understand easily</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dictionary