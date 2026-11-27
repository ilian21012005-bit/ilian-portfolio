import type { ReactNode } from "react";

const DIAGRAM_SLUGS = new Set([
	"analyse-attaques-mitre",
	"continuite-supervision",
	"lab-active-directory",
	"lab-kubernetes-minikube",
	"karu",
]);

export function hasProjectDiagram(slug: string): boolean {
	return DIAGRAM_SLUGS.has(slug);
}

type DiagramMeta = {
	caption: { fr: string; en: string };
	ariaLabel: { fr: string; en: string };
};

const DIAGRAM_META: Record<string, DiagramMeta> = {
	"analyse-attaques-mitre": {
		caption: {
			fr: "Schéma d’architecture · Chaîne d’investigation réseau : captures PCAP, Wireshark, mapping MITRE ATT&CK et règles Suricata.",
			en: "Architecture diagram · Network investigation chain: PCAP captures, Wireshark, MITRE ATT&CK mapping and Suricata rules.",
		},
		ariaLabel: {
			fr: "Schéma d’architecture de la chaîne d’analyse d’attaques PCAP vers MITRE ATT&CK et Suricata",
			en: "Architecture diagram of the attack analysis chain from PCAP to MITRE ATT&CK and Suricata",
		},
	},
	"continuite-supervision": {
		caption: {
			fr: "Schéma d’architecture · Supervision hybride : métriques node_exporter, règles Prometheus, tableaux Grafana et sondes Nagios.",
			en: "Architecture diagram · Hybrid monitoring: node_exporter metrics, Prometheus rules, Grafana dashboards and Nagios probes.",
		},
		ariaLabel: {
			fr: "Schéma d’architecture de supervision reliant node_exporter, Prometheus, Grafana et Nagios",
			en: "Architecture diagram of monitoring linking node_exporter, Prometheus, Grafana and Nagios",
		},
	},
	"lab-active-directory": {
		caption: {
			fr: "Schéma d’architecture · Lab isolé VirtualBox : contrôleur de domaine Windows Server 2022 (AD DS, DNS, LDAP) et poste Windows 11.",
			en: "Architecture diagram · Isolated VirtualBox lab: Windows Server 2022 domain controller (AD DS, DNS, LDAP) and Windows 11 client.",
		},
		ariaLabel: {
			fr: "Schéma d’architecture du domaine Active Directory entre Windows Server 2022 et client Windows 11",
			en: "Architecture diagram of the Active Directory domain between Windows Server 2022 and Windows 11 client",
		},
	},
	"lab-kubernetes-minikube": {
		caption: {
			fr: "Schéma d’architecture · Cluster Minikube local : exposition NodePort, Deployment, ReplicaSet et réplicas nginx.",
			en: "Architecture diagram · Local Minikube cluster: NodePort Service, Deployment, ReplicaSet and nginx replicas.",
		},
		ariaLabel: {
			fr: "Schéma d’architecture Kubernetes sous Minikube du Service NodePort aux Pods nginx",
			en: "Architecture diagram of Kubernetes on Minikube from NodePort Service to nginx Pods",
		},
	},
	karu: {
		caption: {
			fr: "Schéma d’architecture · Pipeline Windows : Desktop Duplication, encodage FFmpeg/NVENC, buffer circulaire .NET et lecture LibVLC.",
			en: "Architecture diagram · Windows pipeline: Desktop Duplication, FFmpeg/NVENC encoding, .NET ring buffer and LibVLC playback.",
		},
		ariaLabel: {
			fr: "Schéma d’architecture logicielle de Karu de la capture écran à la bibliothèque LibVLC",
			en: "Software architecture diagram of Karu from screen capture to LibVLC library",
		},
	},
};

function NodeBox({
	x,
	y,
	w,
	h,
	eyebrow,
	title,
	sub,
	accent = false,
}: {
	x: number;
	y: number;
	w: number;
	h: number;
	eyebrow: string;
	title: string;
	sub: string;
	accent?: boolean;
}) {
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				rx="2"
				fill="var(--ink-surface)"
				stroke={accent ? "var(--ink-accent)" : "var(--ink-line)"}
				strokeWidth={accent ? "1.4" : "1"}
			/>
			<rect
				x={x}
				y={y}
				width={w}
				height="3"
				fill={accent ? "var(--ink-accent)" : "var(--ink-line)"}
			/>
			<text
				x={x + 12}
				y={y + 22}
				fill={accent ? "var(--ink-accent)" : "var(--ink-muted)"}
				fontFamily="var(--font-mono), ui-monospace, monospace"
				fontSize="9.5"
				letterSpacing="0.08em"
			>
				{eyebrow}
			</text>
			<text
				x={x + 12}
				y={y + 45}
				fill="var(--ink-fg)"
				fontFamily="var(--font-sans), system-ui, sans-serif"
				fontSize="13.5"
				fontWeight="600"
			>
				{title}
			</text>
			<text
				x={x + 12}
				y={y + 66}
				fill="var(--ink-muted)"
				fontFamily="var(--font-mono), ui-monospace, monospace"
				fontSize="10"
			>
				{sub}
			</text>
		</g>
	);
}

function ArrowH({ x1, x2, y }: { x1: number; x2: number; y: number }) {
	return (
		<g>
			<line
				x1={x1}
				y1={y}
				x2={x2 - 5}
				y2={y}
				stroke="var(--ink-accent)"
				strokeWidth="1.5"
			/>
			<polygon
				points={`${x2 - 6},${y - 3.5} ${x2},${y} ${x2 - 6},${y + 3.5}`}
				fill="var(--ink-accent)"
			/>
		</g>
	);
}

function renderDiagramBody(slug: string, en: boolean): ReactNode {
	switch (slug) {
		case "analyse-attaques-mitre":
			return (
				<>
					<text
						x="24"
						y="30"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.1em"
					>
						{en
							? "UE R5B09 // TRIAGE WORKFLOW"
							: "UE R5B09 // CHAÎNE D’ANALYSE"}
					</text>
					<NodeBox
						x={24}
						y={76}
						w={130}
						h={88}
						eyebrow="01 / INPUT"
						title="PCAP"
						sub="ARP · FTP · IRC"
					/>
					<ArrowH x1={154} x2={176} y={120} />
					<NodeBox
						x={176}
						y={76}
						w={136}
						h={88}
						eyebrow="02 / INSPECT"
						title="Wireshark"
						sub={en ? "Ports · Flows" : "Ports · Flux"}
					/>
					<ArrowH x1={312} x2={334} y={120} />
					<NodeBox
						x={334}
						y={76}
						w={138}
						h={88}
						eyebrow="03 / MAP"
						title="MITRE ATT&CK"
						sub="T1046 · IOC"
						accent
					/>
					<ArrowH x1={472} x2={494} y={120} />
					<NodeBox
						x={494}
						y={76}
						w={122}
						h={88}
						eyebrow="04 / DETECT"
						title="Suricata"
						sub={en ? "Rules · Harden" : "Règles · SFTP"}
					/>
					<line
						x1="24"
						y1="214"
						x2="616"
						y2="214"
						stroke="var(--ink-line)"
						strokeWidth="1"
					/>
					<text
						x="24"
						y="238"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10.5"
					>
						{en
							? "OBSERVE → CORRELATE CONTEXT → QUALIFY TECHNIQUE → HARDEN"
							: "OBSERVER → CORRÉLER LE CONTEXTE → QUALIFIER → DURCIR"}
					</text>
				</>
			);
		case "continuite-supervision":
			return (
				<>
					<text
						x="24"
						y="30"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.1em"
					>
						{en
							? "UE R5B08 // METRICS & UPTIME"
							: "UE R5B08 // MÉTRIQUES & DISPONIBILITÉ"}
					</text>
					<NodeBox
						x={24}
						y={54}
						w={136}
						h={84}
						eyebrow="HOST"
						title="Linux Node"
						sub="CPU · eth0 · Disk"
					/>
					<ArrowH x1={160} x2={182} y={96} />
					<NodeBox
						x={182}
						y={54}
						w={136}
						h={84}
						eyebrow="EXPORTER"
						title="node_exporter"
						sub="PromQL · Scrape"
					/>
					<ArrowH x1={318} x2={340} y={96} />
					<NodeBox
						x={340}
						y={54}
						w={140}
						h={84}
						eyebrow="ALERTING"
						title="Prometheus"
						sub="CPU > 70% · for: 1m"
						accent
					/>
					<ArrowH x1={480} x2={502} y={96} />
					<NodeBox
						x={502}
						y={54}
						w={114}
						h={84}
						eyebrow="VISUAL"
						title="Grafana"
						sub={en ? "Egress view" : "Débit sortant"}
					/>
					<rect
						x="24"
						y="172"
						width="592"
						height="72"
						rx="2"
						fill="var(--ink-surface)"
						stroke="var(--ink-line)"
						strokeWidth="1"
					/>
					<text
						x="40"
						y="198"
						fill="var(--ink-accent)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.08em"
					>
						{en
							? "COMPLEMENTARY PROBE // NAGIOS"
							: "SONDE COMPLÉMENTAIRE // NAGIOS"}
					</text>
					<text
						x="40"
						y="222"
						fill="var(--ink-fg)"
						fontFamily="var(--font-sans), system-ui, sans-serif"
						fontSize="13"
					>
						{en
							? "Service uptime check (green) vs. bandwidth anomaly (exfiltration alert)"
							: "Disponibilité des services (vert) vs anomalie de débit sortant (exfiltration)"}
					</text>
				</>
			);
		case "lab-active-directory":
			return (
				<>
					<text
						x="24"
						y="30"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.1em"
					>
						{en
							? "UE R5B06 // VIRTUALBOX ISOLATED DOMAIN"
							: "UE R5B06 // DOMAINE ISOLÉ VIRTUALBOX"}
					</text>
					<NodeBox
						x={24}
						y={64}
						w={200}
						h={104}
						eyebrow="DOMAIN CONTROLLER"
						title="Windows Server 2022"
						sub="AD DS · DNS · LDAP"
						accent
					/>
					<ArrowH x1={224} x2={252} y={116} />
					<NodeBox
						x={252}
						y={64}
						w={164}
						h={104}
						eyebrow="DIRECTORY"
						title="OU · Groups · GPO"
						sub={en ? "Policies & rights" : "Règles & accès"}
					/>
					<ArrowH x1={416} x2={444} y={116} />
					<NodeBox
						x={444}
						y={64}
						w={172}
						h={104}
						eyebrow="WORKSTATION"
						title="Windows 11"
						sub={en ? "Domain join · Auth" : "Jointure · Auth"}
					/>
					<line
						x1="24"
						y1="208"
						x2="616"
						y2="208"
						stroke="var(--ink-line)"
						strokeWidth="1"
					/>
					<text
						x="24"
						y="234"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10.5"
					>
						{en
							? "INTERNAL LAB NETWORK // AUTHORITATIVE DNS + LDAP BIND"
							: "RÉSEAU INTERNE DE LAB // DNS AUTORITAIRE + AUTHENTIFICATION LDAP"}
					</text>
				</>
			);
		case "lab-kubernetes-minikube":
			return (
				<>
					<text
						x="24"
						y="30"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.1em"
					>
						{en
							? "UE R5A09 // MINIKUBE OBJECT CHAIN"
							: "UE R5A09 // CHAÎNE D’OBJETS MINIKUBE"}
					</text>
					<NodeBox
						x={24}
						y={74}
						w={136}
						h={92}
						eyebrow="EXPOSE"
						title="Service"
						sub="NodePort"
					/>
					<ArrowH x1={160} x2={182} y={120} />
					<NodeBox
						x={182}
						y={74}
						w={138}
						h={92}
						eyebrow="CONTROLLER"
						title="Deployment"
						sub="Pinned nginx tag"
						accent
					/>
					<ArrowH x1={320} x2={342} y={120} />
					<NodeBox
						x={342}
						y={74}
						w={134}
						h={92}
						eyebrow="SCALING"
						title="ReplicaSet"
						sub="kubectl scale"
					/>
					<ArrowH x1={476} x2={498} y={120} />
					<NodeBox
						x={498}
						y={74}
						w={118}
						h={92}
						eyebrow="WORKLOAD"
						title="Pods ×N"
						sub="Docker · nginx"
					/>
					<line
						x1="24"
						y1="210"
						x2="616"
						y2="210"
						stroke="var(--ink-line)"
						strokeWidth="1"
					/>
					<text
						x="24"
						y="236"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10.5"
					>
						{en
							? "LOCAL CLUSTER // DEPLOYMENT → REPLICASET → POD LIFECYCLE"
							: "CLUSTER LOCAL // CYCLE DEPLOYMENT → REPLICASET → POD"}
					</text>
				</>
			);
		case "karu":
			return (
				<>
					<text
						x="24"
						y="30"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10"
						letterSpacing="0.1em"
					>
						{en
							? "WINDOWS DESKTOP // REPLAY PIPELINE"
							: "WINDOWS DESKTOP // PIPELINE DE REPLAY"}
					</text>
					<NodeBox
						x={24}
						y={72}
						w={136}
						h={92}
						eyebrow="01 / CAPTURE"
						title="Desktop Dup."
						sub="Windows API"
					/>
					<ArrowH x1={160} x2={182} y={118} />
					<NodeBox
						x={182}
						y={72}
						w={134}
						h={92}
						eyebrow="02 / ENCODE"
						title="FFmpeg"
						sub="NVIDIA NVENC"
					/>
					<ArrowH x1={316} x2={338} y={118} />
					<NodeBox
						x={338}
						y={72}
						w={140}
						h={92}
						eyebrow="03 / BUFFER"
						title=".NET Ring"
						sub="Hotkey · OCR opt."
						accent
					/>
					<ArrowH x1={478} x2={500} y={118} />
					<NodeBox
						x={500}
						y={72}
						w={116}
						h={92}
						eyebrow="04 / PLAY"
						title="LibVLC"
						sub="Trim · Tags"
					/>
					<line
						x1="24"
						y1="208"
						x2="616"
						y2="208"
						stroke="var(--ink-line)"
						strokeWidth="1"
					/>
					<text
						x="24"
						y="234"
						fill="var(--ink-muted)"
						fontFamily="var(--font-mono), ui-monospace, monospace"
						fontSize="10.5"
					>
						{en
							? "ROLLING MEMORY BUFFER → LOCAL CLIP SAVE → BUILT-IN LIBRARY"
							: "MÉMOIRE TAMPON GLISSANTE → SAUVEGARDE LOCALE → BIBLIOTHÈQUE"}
					</text>
				</>
			);
		default:
			return null;
	}
}

export function ProjectDiagram({
	slug,
	locale,
	compact = false,
}: {
	slug: string;
	locale: string;
	compact?: boolean;
}) {
	const meta = DIAGRAM_META[slug];
	if (!meta) return null;
	const en = locale.startsWith("en");

	const svg = (
		<svg
			viewBox="0 0 640 280"
			className="diagram-svg"
			role="img"
			aria-label={en ? meta.ariaLabel.en : meta.ariaLabel.fr}
		>
			{renderDiagramBody(slug, en)}
		</svg>
	);

	if (compact) {
		return <div className="diagram-wrap">{svg}</div>;
	}

	return (
		<figure className="detail-figure diagram-figure">
			<div className="diagram-wrap">{svg}</div>
			<figcaption>{en ? meta.caption.en : meta.caption.fr}</figcaption>
		</figure>
	);
}
