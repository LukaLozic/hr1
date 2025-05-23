"use client";

import { useEffect, useState } from "react";
import { Model } from "@/types/model";
import { chaturbateCountries } from '@/utils/countries';
import CountryDropdown from "@/components/CountryDropdown";
import AdBlockNotice from "@/components/AdBlockNotice";
import { usePathname, useRouter } from "next/navigation";
import AgeDropdown from "@/components/AgeDropdown";

export default function HomePage({ genderParam = "" }: { genderParam?: string }) {
    const router = useRouter();
    const path = usePathname();
    const [models, setModels] = useState<Model[]>([]);
    const [selectedGender, setSelectedGender] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(100);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const modelsPerPage = 20;

    useEffect(() => {
        const loadModels = async () => {
            let offset = 0;
            const limit = 500;

            try {
                const res = await fetch(
                    `https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=RCJNu&format=json&limit=${limit}&offset=${offset}&client_ip=request_ip`
                );
                const data = await res.json();
                setModels(data.results || []);
                console.log(`Total models fetched: ${data.results.length}`);
            } catch (error) {
                console.error("Client fetch error:", error);
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (!genderParam) {
            setSelectedGender("All");
            return;
        }
        const decodedParam = decodeURIComponent(genderParam.toLowerCase());

        const genderMapFromParam: { [key: string]: string } = {
            "nogne-mænd": "Male",
            "nogne-damer": "Female",
            par: "Couple",
            trans: "Trans",
            "": "All",
        };

        const genderFromParam = genderMapFromParam[decodedParam];

        if (genderFromParam) {
            setSelectedGender(genderFromParam);
        } else {
            setSelectedGender("All");
        }
    }, [genderParam]);

    const genderMap: { [key: string]: string } = {
        Female: "f",
        Male: "m",
        Couple: "c",
        Trans: "s",
    };

    // ----------- Croatian translations below -----------
    const fullDescriptionFemale = [
        "Ovo nije porno s glumcima – ovo su prave djevojke koje se pale na to da ih gledaš. Svakog dana, 24/7, tisuće napaljenih cura pale kameru, rašire noge i počnu se igrati sa svojom mokrom pičkom – samo za tebe.",
        "Gledaj ih kako trljaju klitoris, uzdišu i mole za još. Neke to rade polako i nježno – prst po prst. Druge odmah guraju dildo duboko i tresu se od jakih vibratora dok ne svrše u ekstazi.",
        "Ima sramežljivih cura koje pocrvene kad ih pohvališ – ali ne prestaju se igrati. Ima i divljih, koje nabijaju guzicu u kameru i viču: 'Reci mi da drkaš na mene!'",
        "Neke su mlade tinejdžerke koje prvi put isprobavaju kameru. Druge su iskusne milfice koje znaju točno što reći i napraviti da ti dignu kurac u sekundi.",
        "Pičke su obrijane, dlakave, uske, sočne, izlizane – izaberi baš onu koja te pali. Možeš ih gledati, slati poruke, birati po izgledu i čak im naređivati što da rade.",
        "Sve je uživo. Sve je stvarno. I sve je jebeno napaljujuće.",
    ];

    const fullDescriptionCouple = [
        "Stotine parova su online upravo sada – klikni i gledaj ih kako se jebu pred kamerom. Ovdje dobivaš sirov i napaljen live seks iz spavaće sobe, cijeli dan i noć.",
        "Na SeksUživo upoznaješ prave amaterske parove iz cijelog svijeta, spremne pokazati sve. Egzotični, znatiželjni, napaljeni – vole da ih se gleda dok se žestoko jebu pred kamerom.",
        "Ako želiš vidjeti prave strasti, tvrde kurce i mokre pičke u akciji, na pravom si mjestu. 24/7 webcam seks bez filtera.",
    ];

    const fullDescriptionTrans = [
        "Klikni na sliku i uđi direktno u svijet napaljenih transseksualaca koji vole biti gledani. Ovdje su prelijepe shemale djevojke s čvrstim sisama, tvrdim kurcima i zavodljivim usnama – sve uživo na kameri.",
        "Bilo da te pali napaljena trans cura koja se igra sama sa sobom, puši kurac ili je jebu u guzu – ovdje imaš sve, sirovo i izbliza.",
        "Ove trans osobe su pravi amateri iz cijelog svijeta, vole pokazivati svoja napaljena tijela pred kamerom. Neke flertuju, druge dominiraju – a mnoge žele da ti preuzmeš kontrolu u chatu.",
        "Ako voliš kombinaciju sisa i kurca, pohotne poglede i gladan stav, na pravom si mjestu. Gledaj ih uživo, pričaj s njima, i natjeraj ih da rade sve što sanjaš.",
    ];

    const fullDescriptionMale = [
        "Tvrdi kurčevi, napaljeni dečki i zgodni gay parovi pokazuju sve pred kamerom – spremni su za igru, flert i prskanje za tebe. Ovdje su i homo i bi dečki koji vole drkati i pokazivati se.",
        "Uđi, gledaj ih kako se spremaju, trljaju se i možda pronađu dečka za seks uživo. Naši muškarci su pravi amateri – pale ih pogledi dok se igraju sami ili s drugima.",
        "Pridruži se, čavrljaj i uživaj u prizoru tvrdih tijela i vrućih kuraca koji čekaju tvoju pažnju.",
    ];
    // ---------------------------------------------------

    const filteredModels = models.filter((model) => {
        if (selectedGender !== "All" && model.gender !== genderMap[selectedGender]) return false;
        if (selectedCountry && model.country !== selectedCountry) return false;
        if (model.age < minAge || model.age > maxAge) return false;
        return true;
    });

    const indexOfLastModel = currentPage * modelsPerPage;
    const indexOfFirstModel = indexOfLastModel - modelsPerPage;
    const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
    const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

    const countryCounts: { [country: string]: number } = models.reduce((acc, model) => {
        if (model.country) {
            acc[model.country] = (acc[model.country] || 0) + 1;
        }
        return acc;
    }, {} as { [country: string]: number });

    const uniqueCountries = Object.keys(countryCounts).sort();

    const handleAgeChange = (range: string) => {
        const [min, max] = range.split("-").map(Number);
        setMinAge(min);
        setMaxAge(max);
        setCurrentPage(1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGender, selectedCountry, minAge, maxAge]);

    const getDescriptionContent = () => {
        if (selectedGender === "Female") {
            return {
                title: "Camshow s curama i ženama",
                paragraphs: fullDescriptionFemale,
            };
        } else if (selectedGender === "Couple") {
            return {
                title: "Gledaj parove kako se jebu uživo na kameri",
                paragraphs: fullDescriptionCouple,
            };
        } else if (selectedGender === "Trans") {
            return {
                title: "Transseksualci uživo – gledaj shemale djevojke kako pokazuju sve",
                paragraphs: fullDescriptionTrans,
            };
        } else if (selectedGender === "Male") {
            return {
                title: "Gledaj gole muškarce i dečke kako se seksaju uživo na kameri",
                paragraphs: fullDescriptionMale,
            };
        }
        return null;
    };

    const description = getDescriptionContent();

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
            {/* AdBlock Warning */}

            {/* Header */}
            <header className="bg-zinc-950 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1
                        className="text-3xl font-bold tracking-wide text-pink-500 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        SeksUživo
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center">
                        <CountryDropdown
                            countries={chaturbateCountries}
                            selectedCountry={selectedCountry}
                            onChange={setSelectedCountry}
                            countryCounts={countryCounts}
                        />
                        <AgeDropdown minAge={minAge} maxAge={maxAge} onChange={handleAgeChange} />


                        {["All", "Female", "Male", "Couple", "Trans"].map((gender) => (
                            <button
                                key={gender}
                                onClick={() => {
                                    const genderPathMap: { [key: string]: string } = {
                                        All: "",
                                        Female: "nogne-damer",
                                        Male: "nogne-mænd",
                                        Couple: "par",
                                        Trans: "trans",
                                    };
                                    router.push(`/${genderPathMap[gender]}`);
                                    setIsExpanded(false);
                                }}
                                className={`px-3 py-1 rounded ${
                                    selectedGender === gender
                                        ? "bg-pink-500 text-white"
                                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                }`}
                            >
                                {gender === "All"
                                    ? "Svi"
                                    : gender === "Female"
                                    ? "Žene"
                                    : gender === "Couple"
                                    ? "Parovi"
                                    : gender === "Trans"
                                    ? "Trans"
                                    : "Muškarci"}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Optional Description Section */}
            {description && (
                <section className="bg-zinc-800 text-white px-6 py-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-xl font-semibold text-pink-400 mb-4">{description.title}</h2>
                        <div className="text-sm leading-6 text-zinc-300 space-y-4">
                            {isExpanded
                                ? description.paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
                                : <p>{description.paragraphs[0]}</p>}
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-4 text-sm text-pink-400 hover:underline border border-pink-500 px-2 py-1 rounded"
                        >
                            {isExpanded ? "Prikaži manje ▲" : "Prikaži više ▼"}
                        </button>
                    </div>
                </section>
            )}

            {/* Main content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
                {/* AdBlockNotice  Optional*/}

                {filteredModels.length === 0 ? (
                    <p className="text-center text-gray-400">Nema pronađenih modela.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {currentModels.map((model) => (
                                <a
                                    key={model.username}
                                    href={`/api/redirect?to=${encodeURIComponent(model.chat_room_url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition"
                                >
                                    <div className="relative">
                                        <img
                                            src={model.image_url_360x270}
                                            alt={model.display_name}
                                            className="w-full h-44 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    </div>

                                    <div className="p-3 pb-10 space-y-2 relative z-10">
                                        <div className="flex items-center justify-between text-sm font-semibold">
                                            <span>{model.username}</span>
                                            <div className="flex items-center space-x-2 text-pink-400">
                                                <span>{model.age}</span>
                                                {model.country && (
                                                    <img
                                                        src={`https://flagcdn.com/24x18/${model.country.toLowerCase()}.png`}
                                                        alt={model.country}
                                                        className="w-5 h-auto rounded-sm"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="border-t border-zinc-700 my-2"></div>
                                        <p className="text-xs text-zinc-400 line-clamp-2 leading-snug">{model.room_subject}</p>
                                    </div>

                                    <div className="absolute bottom-2 right-2 flex items-center text-xs text-zinc-400 bg-zinc-900 bg-opacity-75 px-2 py-1 rounded">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                            vectorEffect="non-scaling-stroke"
                                            className="w-4 h-4 mr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.68 1.662-1.196 2.385a11.954 11.954 0 01-1.786 1.987C16.268 16.057 14.477 17 12 17c-2.477 0-4.268-.943-5.56-2.628a11.954 11.954 0 01-1.786-1.987A11.954 11.954 0 012.458 12z"
                                            />
                                        </svg>
                                        <span>{model.num_users}</span>
                                    </div>

                                    {typeof model.seconds_online === "number" && (
                                        <div className="absolute bottom-2 left-2 bg-zinc-900 bg-opacity-75 rounded px-2 py-1 text-xs text-white flex items-center space-x-1 select-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-pink-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                            </svg>
                                            <span>
                                                {(model.seconds_online / 3600).toFixed(1)} h
                                            </span>
                                        </div>
                                    )}

                                    {model.is_hd && (
                                        <span className="absolute top-2 right-2 bg-pink-500 text-xs px-2 py-1 rounded font-bold">
                                            HD
                                        </span>
                                    )}
                                    {model.is_new && (
                                        <span className="absolute top-2 left-2 bg-green-600 text-xs px-2 py-1 rounded font-bold">
                                            NOVO
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div className="mt-8 pt-4 border-t border-pink-300">
                                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-white select-none px-4 py-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded border border-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Prethodna
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 2 && page <= currentPage + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-3 py-1 rounded border border-pink-500 ${
                                                        currentPage === page ? "bg-pink-600 font-bold" : "hover:bg-pink-600"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        }
                                        if (
                                            (page === currentPage - 3 && page > 1) ||
                                            (page === currentPage + 3 && page < totalPages)
                                        ) {
                                            return (
                                                <span key={page} className="px-2 py-1">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded border border-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Sljedeća
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <footer className="text-center p-5 text-xs text-zinc-500">
                &copy; 2025 SeksUzivo. Sva prava pridržana.
            </footer>
        </div>
    );
}