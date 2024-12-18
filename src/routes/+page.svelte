<script>
	import mountains from '$lib/images/mountains.jpeg';
	import ProjectTile from './ProjectTile.svelte';
	import jackOrbital from '$lib/images/jackOrbital.jpg';
	import jackSigapp from '$lib/images/jackSigapp.jpg';
	import purdueHackersSign from '$lib/images/purdueHackersSign.png';
	import peraton from '$lib/images/peraton.jpg';
	import leidos from '$lib/images/leidos.jpg';
	import tped3d from '$lib/images/tped3d.png';
	import codeCheck from '$lib/images/codeCheck.png';
	import beach from '$lib/images/jackBeach.jpg';
	import Link from './Link.svelte';
</script>

<svelte:head>
	<title>Jack Hogan</title>
	<meta name="description" content="Jack Hogan's Portfolio" />
	<meta name="author" content="Jack Hogan" />
	<meta
		name="keywords"
		content="Jack Hogan, Computer Science, Artifical Intelligence, CS, AI, Math, Purdue"
	/>
	<meta name="darkreader-lock" />
</svelte:head>

<section
	id="hero"
	style="background-image: linear-gradient(to bottom, transparent 80%, var(--color-bg)) ,url({mountains})"
>
	<div class="glassBackground">
		<h1 class="noDeco">Jack Hogan</h1>

		<div>
			<h2>Developer - Entrepreneur - Leader</h2>

			<h2>Purdue CS, AI & Math '26</h2>
		</div>
	</div>

	<!-- <h2>
		This site is a placeholder until I get more time to put into it. Check out my <a href="https://github.com/ImTheSquid" target="_blank" rel="noopener noreferrer">GitHub</a> or have some fun with the counter!
	</h2>

	<Counter /> -->
</section>

<section id="about">
	<h1>About Me</h1>

	<div id="aboutGroup">
		<img src={beach} alt="Me standing on a beach at Turks and Caicos." />
		<p>
			Hi! I'm Jack. I'm a junior at Purdue studying for a double major in Computer Science and
			Artifical Intelligence with a minor in Mathematics. I have a wide range of interests from
			programming to exercising, the outdoors, reading, skiing, exploration, and much more!<br /><br
			/>
			Check out my
			<a
				href="https://raw.githubusercontent.com/ImTheSquid/Resume/master/JackHoganResume.pdf"
				target="_blank">resume</a
			>!
		</p>
	</div>
</section>

<section>
	<h1>Projects & Positions</h1>

	<div class="grid">
		<ProjectTile
			project={{
				link: 'https://careers.leidos.com/pages/leidosinnovationscenter',
				title: 'Leidos Innovations Center Software Engineering Intern',
				description:
					'The Leidos Innovations Center is Ledios&apos;s research and development division. During my internship I created and refined GPU-based signal processing algorithms in CUDA, Rust, and Python for real-time applications.<br/><br/>I also created a real-time machine learning model to lock onto radar targets hidden in interference patterns with time-aware strategies and PyTorch.',
				image: leidos,
				imageAlt: 'Ledios Innovations Center Logo'
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://purdueorbital.com',
				title: 'Purdue Orbital Avionics Design Lead',
				description:
					'Purdue Orbital is a space team working to create a rocket launch system with the eventual goal of being the first independent college organization to put a satellite in space.<br/><br/> Using my knowledge of distributed systems and aeronautics, I lead a team working to create a fault-tolerant and compact system to activate various rocketry systems while collecting data for assorted launch missions.',
				image: jackOrbital,
				imageAlt: 'Me presenting in front of new Purdue Orbital members.'
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://sigapp.club/',
				title: 'Purdue SIGAPP Backend Devleopment Lead',
				description:
					'Purdue SIGAPP is a team that works to create full-stack mobile applications using a variety of technologies.<br/><br/> I lead the backend development team working to create a complex microservice-based architecture using Rust and Leptos to communicate with an app using React Native. I also run workshops to teach people new technologies we use in the club.',
				image: jackSigapp,
				imageAlt: 'Me running a Rust workshop for prospective SIGAPP members and helping a student.'
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://blog.purduehackers.com/posts/sign',
				title: 'Purdue Hackers Sign',
				description:
					'Purdue Hackers is a club where people come together to hang out and make cool projects.<br/><br/> I made a one meter tall RGB LED-based sign of our logo with self-updating firmware and a custom circuit board and housing. We&apos;re now exploring new integrations for other Purdue Hackers memebers to integrate their own code into the Sign.',
				image: purdueHackersSign,
				imageAlt: 'The mostly-assembled sign.'
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://www.peraton.com/',
				title: 'Software Intern at Peraton',
				description:
					"I led the expansion of ServiceNow's new Artificial Intelligence module using JavaScript and Document Intelligence including custom input, parsing, and customer interfaces.<br/><br/> I also developed and presented a whitepaper on the systems and processes developed while managing daily meetings with my fellow interns.",
				image: peraton,
				imageAlt: "Peraton's logo."
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://boilerlink.purdue.edu/organization/tpedatpurdue',
				title: 'Theme Park Engineering & Design at Purdue 3D-Printed Coaster',
				description:
					"TPED at Purdue is an organization dedicated to theme parks & the engineering behind them.<br/><br/> I'm on the Electronics subteam for the 3D coaster project where I'm working on an implementation plan for a complex system that will involve custom PCBs and software to drive a physical roller coaster control system.",
				image: tped3d,
				imageAlt: 'The 3D coaster in CAD.'
			}}
		/>
		<ProjectTile
			project={{
				link: 'https://github.com/ImTheSquid/CodeCheck',
				title: 'CodeCheck',
				description:
					"CodeCheck is a piece of in-development software for a research project to try to detect plagiarism and algorithmic complexity in submitted assignments.<br/><br/> I'm coordinating research efforts on Abstract Syntax Trees combined with Graph Attention Networks and other machine learning techniques to find an optimal solution for parsing and acting upon the code we ingest.",
				image: codeCheck,
				imageAlt: 'A screenshot of the CodeCheck repository.'
			}}
		/>
	</div>
</section>

<section id="links">
	<h1>Links</h1>

	<div>
		<Link
			link={{
				destination:
					'https://raw.githubusercontent.com/ImTheSquid/Resume/master/JackHoganResume.pdf',
				name: 'Resume'
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-file-earmark-person"
				viewBox="0 0 16 16"
			>
				<path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
				<path
					d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"
				/>
			</svg>
		</Link>
		<Link link={{ destination: 'https://github.com/ImTheSquid', name: 'GitHub' }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-github"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</Link>
		<Link link={{ destination: 'mailto:jackhogan11@gmail.com', name: 'Email' }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-envelope"
				viewBox="0 0 16 16"
			>
				<path
					d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
				/>
			</svg>
		</Link>
		<Link link={{ destination: 'https://www.linkedin.com/in/jackhogan11/', name: 'LinkedIn' }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-linkedin"
				viewBox="0 0 16 16"
			>
				<path
					d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
				/>
			</svg>
		</Link>
		<Link link={{ destination: 'https://bsky.app/profile/jackhogan.me', name: 'BlueSky' }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-cloud-sun-fill"
				viewBox="0 0 16 16"
			>
				<path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
				<path
					d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
				/>
			</svg>
		</Link>
		<Link
			link={{ destination: 'https://discordapp.com/users/262055523896131584', name: 'Discord' }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-discord"
				viewBox="0 0 16 16"
			>
				<path
					d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
				/>
			</svg>
		</Link>
		<Link
			link={{
				destination: 'https://ring.purduehackers.com/next?host=jackhogan.me',
				name: 'Purdue Hackers Ring'
			}}
		>
			<svg
				width="60%"
				height="100%"
				viewBox="0 0 2160 2160"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				xml:space="preserve"
				xmlns:serif="http://www.serif.com/"
				fill="currentColor"
				style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
			>
				<path
					d="M720.627,362.058L1080,571.597L1428.11,368.313L1429.15,773.832L1452.87,774.118L1454.11,357.11L1802.6,554.109L1804.96,1391.62L1454.43,1587.65L1454.11,1161.75L1080,1379.46L1080,1809.54L718.917,2015.02L358.458,1805.69L359.775,1402.62L726.188,1612.76L737.039,1591.83L373.201,1380.37L721.069,1177.37L720.627,362.058Z"
				/>
				<path
					id="Main"
					d="M720.627,362.058L721.069,1177.37L373.201,1380.37L737.039,1591.83L726.188,1612.76L359.775,1402.62L358.458,1805.69L718.917,2015.02L1080,1809.54L1080,1379.46L1454.11,1161.75L1454.43,1587.65L1804.96,1391.62L1802.6,554.109L1454.11,357.11L1452.87,774.118L1429.15,773.832L1428.11,368.313L1080,571.597L720.627,362.058Z"
					style="fill:none;"
				/>
				<g id="Bottom-Triangle" serif:id="Bottom Triangle" transform="matrix(1,0,0,1,-24,39)">
					<path
						d="M1115.06,1359.64L1454.9,1556.32M1453.86,1161.32C1454.01,1161.23 1454.2,1161.23 1454.36,1161.32C1454.51,1161.4 1454.61,1161.57 1454.61,1161.75L1454.9,1556.32L1453.61,1162.62L1115.06,1359.64L1454.36,1161.32L1454.9,1556.32L1115.06,1359.64"
					/>
				</g>
				<path d="M1080,546.597L731.583,343.446L1079.85,141.47L1428.11,343.313L1080,546.597Z" />
			</svg>
		</Link>
	</div>
</section>

<style>
	section {
		/* flex: 0.6; */
		width: 100hh;
		margin: 4em;
	}

	#hero {
		background-color: var(--color-bg);
		background-position: center;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0;
		height: 100vh;
	}

	#hero > div {
		padding: 2em;
		/* From https://css.glass */
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3.4px);
		-webkit-backdrop-filter: blur(3.4px);
		border: 1px solid rgba(255, 255, 255, 0.33);
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	div * {
		margin: 0.1em;
	}

	h1 {
		width: 100%;
		font-size: 7em;
		font-weight: bold;
		margin: 0 0.1em;
		text-decoration: underline;
	}

	.noDeco {
		text-decoration: none;
	}

	h2 {
		font-size: 2em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: start;
	}

	#links div {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		padding: 2em;
		overflow-x: scroll;
	}

	#aboutGroup {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		align-items: start;
	}

	#aboutGroup *:not(br) {
		margin: 0.5em;
		font-size: xx-large;
		max-width: 50%;
	}

	#aboutGroup a {
		margin: 0;
	}

	#about img {
		width: 20%;
		height: auto;
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	}

	svg {
		padding: 1em;
		color: var(--color-theme-1);
	}

	@media (max-width: 1000px) {
		h1 {
			font-size: 3em;
		}

		h2 {
			font-size: 0.8em;
		}

		.grid {
			display: flex;
			flex-direction: column;
		}

		#links div {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: start;
			margin: 0.2em;
		}

		#aboutGroup *:not(br) {
			font-size: medium;
		}
	}
</style>
