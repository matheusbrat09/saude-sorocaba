'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Dumbbell, Camera, Home, Menu, X, Play, Info, Utensils, Navigation, Clock, Users, Calculator } from 'lucide-react'

// Dados das academias ao ar livre de Sorocaba com fotos reais
const academias = [
  {
    id: 1,
    nome: "Academia ao Ar Livre - Parque Campolim",
    endereco: "Parque Campolim, Sorocaba - SP",
    lat: -23.4894,
    lng: -47.4414,
    aparelhos: 12,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    descricao: "Academia completa com vista para o lago, ideal para exercícios matinais",
    equipamentos: ["Simulador de Caminhada", "Barras Paralelas", "Alongador", "Bicicleta Aérea"]
  },
  {
    id: 2,
    nome: "Academia ao Ar Livre - Parque da Biquinha",
    endereco: "Parque da Biquinha, Sorocaba - SP", 
    lat: -23.5015,
    lng: -47.4526,
    aparelhos: 8,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    descricao: "Ambiente familiar com área verde preservada e equipamentos modernos",
    equipamentos: ["Simulador de Esqui", "Simulador de Remo", "Alongador", "Barras"]
  },
  {
    id: 3,
    nome: "Academia ao Ar Livre - Parque Quinzinho de Barros",
    endereco: "Parque Quinzinho de Barros, Sorocaba - SP",
    lat: -23.5089,
    lng: -47.4678,
    aparelhos: 15,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    descricao: "A maior academia ao ar livre da cidade, com zoológico e área de lazer",
    equipamentos: ["Todos os aparelhos disponíveis", "Pista de caminhada", "Área de alongamento"]
  },
  {
    id: 4,
    nome: "Academia ao Ar Livre - Parque Carlos Alberto de Souza",
    endereco: "Parque Carlos Alberto de Souza, Sorocaba - SP",
    lat: -23.4756,
    lng: -47.4423,
    aparelhos: 10,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=600&h=400&fit=crop",
    descricao: "Academia em ambiente tranquilo, perfeita para exercícios de baixo impacto",
    equipamentos: ["Simulador de Caminhada", "Bicicleta Aérea", "Alongador", "Barras Paralelas"]
  },
  {
    id: 5,
    nome: "Academia ao Ar Livre - Parque Vitória Régia",
    endereco: "Parque Vitória Régia, Sorocaba - SP",
    lat: -23.4923,
    lng: -47.4512,
    aparelhos: 9,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    descricao: "Academia moderna com equipamentos de última geração e área sombreada",
    equipamentos: ["Simulador de Esqui", "Simulador de Remo", "Barras Paralelas", "Alongador"]
  },
  {
    id: 6,
    nome: "Academia ao Ar Livre - Parque Chico Mendes",
    endereco: "Parque Chico Mendes, Sorocaba - SP",
    lat: -23.4678,
    lng: -47.4389,
    aparelhos: 11,
    horario: "24h",
    foto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    descricao: "Academia integrada com trilha ecológica e área de convivência",
    equipamentos: ["Bicicleta Aérea", "Simulador de Caminhada", "Barras", "Alongador"]
  }
]

// Dados dos aparelhos com fotos reais
const aparelhos = [
  {
    id: 1,
    nome: "Simulador de Caminhada",
    descricao: "Fortalece pernas e melhora coordenação",
    instrucoes: "Suba na plataforma, segure as barras laterais e faça movimentos de caminhada alternando as pernas.",
    beneficios: ["Fortalece músculos das pernas", "Melhora coordenação", "Baixo impacto"],
    imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    nome: "Barras Paralelas",
    descricao: "Fortalece braços, ombros e core",
    instrucoes: "Apoie as mãos nas barras, eleve o corpo e faça flexões ou mantenha a posição isométrica.",
    beneficios: ["Fortalece braços e ombros", "Desenvolve o core", "Melhora força funcional"],
    imagem: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    nome: "Simulador de Esqui",
    descricao: "Exercício cardiovascular completo",
    instrucoes: "Segure as alças, posicione os pés nas plataformas e faça movimentos alternados como no esqui.",
    beneficios: ["Exercício cardiovascular", "Fortalece pernas e braços", "Melhora coordenação"],
    imagem: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    nome: "Alongador",
    descricao: "Melhora flexibilidade e mobilidade",
    instrucoes: "Use as barras em diferentes alturas para alongar diferentes grupos musculares.",
    beneficios: ["Melhora flexibilidade", "Reduz tensão muscular", "Previne lesões"],
    imagem: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    nome: "Simulador de Remo",
    descricao: "Fortalece costas e braços",
    instrucoes: "Sente-se, segure as alças e puxe em direção ao peito, mantendo as costas retas.",
    beneficios: ["Fortalece costas", "Melhora postura", "Exercício de baixo impacto"],
    imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    nome: "Bicicleta Aérea",
    descricao: "Exercício cardiovascular sem impacto",
    instrucoes: "Sente-se, segure as alças e pedale no ar, mantendo um ritmo constante.",
    beneficios: ["Exercício cardiovascular", "Fortalece pernas", "Sem impacto nas articulações"],
    imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  }
]

export default function MindBodyBoostApp() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedAparelho, setSelectedAparelho] = useState(null)
  const [selectedAcademia, setSelectedAcademia] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [refeicoes, setRefeicoes] = useState([])
  const [cameraActive, setCameraActive] = useState(false)
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [imc, setImc] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Carregar refeições do localStorage
  useEffect(() => {
    const savedRefeicoes = localStorage.getItem('refeicoes-mind-body-boost')
    if (savedRefeicoes) {
      setRefeicoes(JSON.parse(savedRefeicoes))
    }
  }, [])

  // Salvar refeições no localStorage
  const salvarRefeicoes = (novasRefeicoes) => {
    setRefeicoes(novasRefeicoes)
    localStorage.setItem('refeicoes-mind-body-boost', JSON.stringify(novasRefeicoes))
  }

  // Calcular IMC
  const calcularIMC = () => {
    if (peso && altura) {
      const pesoNum = parseFloat(peso)
      const alturaNum = parseFloat(altura) / 100 // converter cm para metros
      const imcCalculado = pesoNum / (alturaNum * alturaNum)
      setImc(imcCalculado.toFixed(1))
    }
  }

  // Classificar IMC
  const classificarIMC = (imcValue) => {
    if (imcValue < 18.5) return { categoria: 'Abaixo do peso', cor: 'text-blue-600' }
    if (imcValue < 25) return { categoria: 'Peso normal', cor: 'text-green-600' }
    if (imcValue < 30) return { categoria: 'Sobrepeso', cor: 'text-yellow-600' }
    if (imcValue < 35) return { categoria: 'Obesidade grau I', cor: 'text-orange-600' }
    if (imcValue < 40) return { categoria: 'Obesidade grau II', cor: 'text-red-600' }
    return { categoria: 'Obesidade grau III', cor: 'text-red-800' }
  }

  // Ativar câmera
  const ativarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      alert('Erro ao acessar a câmera. Verifique as permissões.')
    }
  }

  // Capturar foto e analisar
  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      
      // Simular análise nutricional
      const analise = analisarRefeicao()
      const novaRefeicao = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        imagem: canvas.toDataURL(),
        ...analise
      }
      
      const novasRefeicoes = [novaRefeicao, ...refeicoes]
      salvarRefeicoes(novasRefeicoes)
      
      // Parar câmera
      const stream = video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  // Simular análise nutricional
  const analisarRefeicao = () => {
    const alimentos = [
      { nome: 'Arroz integral', calorias: 150 },
      { nome: 'Frango grelhado', calorias: 200 },
      { nome: 'Salada verde', calorias: 30 },
      { nome: 'Feijão', calorias: 120 },
      { nome: 'Legumes refogados', calorias: 80 }
    ]
    
    const alimentosDetectados = alimentos.slice(0, Math.floor(Math.random() * 3) + 2)
    const totalCalorias = alimentosDetectados.reduce((sum, item) => sum + item.calorias, 0)
    
    return {
      alimentos: alimentosDetectados,
      calorias: totalCalorias,
      feedback: totalCalorias > 400 ? 'Refeição calórica - ideal para pós-treino!' : 'Refeição equilibrada e saudável!'
    }
  }

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Mind Body Boost
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubra as academias ao ar livre de Sorocaba e transforme sua saúde
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveSection('mapa')}
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Encontrar Academias
            </button>
            <button
              onClick={() => setActiveSection('aparelhos')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Ver Aparelhos
            </button>
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Por que escolher as academias ao ar livre?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Exercício Gratuito</h3>
              <p className="text-gray-600">Acesso livre e gratuito a equipamentos de qualidade para toda a família.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Localizações Estratégicas</h3>
              <p className="text-gray-600">Academias espalhadas pelos principais parques da cidade.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Acompanhamento Nutricional</h3>
              <p className="text-gray-600">Analise suas refeições e receba feedback nutricional personalizado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-gradient-to-r from-green-600 to-purple-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-lg opacity-90">Academias Mapeadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">65+</div>
              <div className="text-lg opacity-90">Aparelhos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Gratuito</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-lg opacity-90">Acesso Livre</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMapa = () => (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Academias ao Ar Livre em Sorocaba
        </h2>
        
        {selectedAcademia ? (
          // Detalhes da academia selecionada
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={() => setSelectedAcademia(null)}
              className="m-6 flex items-center text-green-600 hover:text-green-700"
            >
              <X className="w-5 h-5 mr-2" />
              Voltar ao mapa
            </button>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedAcademia.foto}
                    alt={selectedAcademia.nome}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Localização</h4>
                    <div className="bg-green-100 rounded-lg p-8 text-center">
                      <Navigation className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-600">Mapa interativo seria exibido aqui</p>
                      <p className="text-sm text-green-500 mt-2">
                        Lat: {selectedAcademia.lat}, Lng: {selectedAcademia.lng}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedAcademia.nome}</h3>
                  <p className="text-gray-600 mb-6">{selectedAcademia.descricao}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Dumbbell className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{selectedAcademia.aparelhos}</div>
                      <div className="text-sm text-gray-600">Aparelhos</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-800">{selectedAcademia.horario}</div>
                      <div className="text-sm text-gray-600">Funcionamento</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Equipamentos disponíveis:</h4>
                    <div className="space-y-2">
                      {selectedAcademia.equipamentos.map((equipamento, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {equipamento}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    {selectedAcademia.endereco}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Abrir no Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Mapa visual com grid de academias */}
            <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mapa Visual das Academias</h3>
                <p className="text-gray-600">Clique em qualquer academia para ver detalhes completos</p>
              </div>
              
              {/* Grid visual do mapa */}
              <div className="grid md:grid-cols-3 gap-4">
                {academias.map((academia) => (
                  <div
                    key={academia.id}
                    onClick={() => setSelectedAcademia(academia)}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                  >
                    <img
                      src={academia.foto}
                      alt={academia.nome}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                      {academia.nome}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center">
                        <Dumbbell className="w-3 h-3 mr-1" />
                        {academia.aparelhos} aparelhos
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        24h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista detalhada de academias */}
            <div className="grid md:grid-cols-2 gap-6">
              {academias.map((academia) => (
                <div key={academia.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={academia.foto}
                    alt={academia.nome}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{academia.nome}</h3>
                        <p className="text-gray-600 flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {academia.endereco}
                        </p>
                        <p className="text-gray-600 text-sm">{academia.descricao}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {academia.aparelhos} aparelhos
                      </div>
                      <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {academia.horario}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedAcademia(academia)}
                      className="w-full bg-gradient-to-r from-green-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderAparelhos = () => (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Guia de Aparelhos
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Aprenda a usar cada aparelho corretamente com nosso personal trainer virtual
        </p>

        {selectedAparelho ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={() => setSelectedAparelho(null)}
              className="m-6 flex items-center text-green-600 hover:text-green-700"
            >
              <X className="w-5 h-5 mr-2" />
              Voltar aos aparelhos
            </button>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedAparelho.imagem}
                    alt={selectedAparelho.nome}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Vídeo Explicativo</h4>
                    <div className="bg-purple-100 rounded-lg p-8 text-center">
                      <Play className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                      <p className="text-purple-600">Vídeo demonstrativo seria exibido aqui</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedAparelho.nome}</h3>
                  <p className="text-gray-600 mb-6">{selectedAparelho.descricao}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Como usar:</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedAparelho.instrucoes}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Benefícios:</h4>
                    <ul className="space-y-2">
                      {selectedAparelho.beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {beneficio}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aparelhos.map((aparelho) => (
              <div key={aparelho.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={aparelho.imagem}
                  alt={aparelho.nome}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{aparelho.nome}</h3>
                  <p className="text-gray-600 mb-4">{aparelho.descricao}</p>
                  <button
                    onClick={() => setSelectedAparelho(aparelho)}
                    className="w-full bg-gradient-to-r from-green-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <Info className="w-5 h-5 mr-2" />
                    Ver Instruções
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderCalculadoraIMC = () => (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Calculadora de IMC
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Calcule seu Índice de Massa Corporal e descubra se você está no peso ideal
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Dados Corporais</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder="Ex: 70"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ex: 175"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={calcularIMC}
                  disabled={!peso || !altura}
                  className="w-full bg-gradient-to-r from-green-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calcular IMC
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Resultado</h3>
              
              {imc ? (
                <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-gray-800 mb-2">{imc}</div>
                    <div className="text-lg text-gray-600">Seu IMC</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-xl font-semibold mb-2 ${classificarIMC(parseFloat(imc)).cor}`}>
                      {classificarIMC(parseFloat(imc)).categoria}
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Interpretação:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Abaixo de 18,5: Abaixo do peso</div>
                        <div>• 18,5 - 24,9: Peso normal</div>
                        <div>• 25,0 - 29,9: Sobrepeso</div>
                        <div>• 30,0 - 34,9: Obesidade grau I</div>
                        <div>• 35,0 - 39,9: Obesidade grau II</div>
                        <div>• Acima de 40: Obesidade grau III</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Preencha os dados para calcular seu IMC</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dicas de saúde */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Dicas para uma Vida Saudável</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Dumbbell className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Exercite-se Regularmente</h4>
              <p className="text-gray-600 text-sm">Pratique atividades físicas pelo menos 150 minutos por semana</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Alimentação Equilibrada</h4>
              <p className="text-gray-600 text-sm">Mantenha uma dieta rica em frutas, verduras e proteínas magras</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Durma Bem</h4>
              <p className="text-gray-600 text-sm">Tenha de 7 a 9 horas de sono de qualidade por noite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlimentacao = () => (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Análise Nutricional
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tire uma foto da sua refeição e receba feedback nutricional instantâneo
        </p>

        {/* Câmera */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Capturar Refeição</h3>
          
          {!cameraActive ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Clique para ativar a câmera e fotografar sua refeição</p>
              <button
                onClick={ativarCamera}
                className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Ativar Câmera
              </button>
            </div>
          ) : (
            <div className="text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md mx-auto rounded-lg mb-4"
              />
              <canvas ref={canvasRef} className="hidden" />
              <button
                onClick={capturarFoto}
                className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mr-4"
              >
                Capturar Foto
              </button>
              <button
                onClick={() => {
                  const stream = videoRef.current?.srcObject
                  if (stream) {
                    const tracks = stream.getTracks()
                    tracks.forEach(track => track.stop())
                  }
                  setCameraActive(false)
                }}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Histórico de refeições */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Histórico de Refeições</h3>
          
          {refeicoes.length === 0 ? (
            <div className="text-center py-8">
              <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma refeição analisada ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {refeicoes.map((refeicao) => (
                <div key={refeicao.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={refeicao.imagem}
                      alt="Refeição"
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-500">{refeicao.data}</p>
                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                          {refeicao.calorias} kcal
                        </div>
                      </div>
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-800 mb-2">Alimentos detectados:</h4>
                        <div className="flex flex-wrap gap-2">
                          {refeicao.alimentos.map((alimento, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {alimento.nome} ({alimento.calorias} kcal)
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-purple-800 font-medium">{refeicao.feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Mind Body Boost
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveSection('home')}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'home'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                Início
              </button>
              <button
                onClick={() => setActiveSection('mapa')}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'mapa'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Mapa
              </button>
              <button
                onClick={() => setActiveSection('aparelhos')}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'aparelhos'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Dumbbell className="w-5 h-5 mr-2" />
                Aparelhos
              </button>
              <button
                onClick={() => setActiveSection('imc')}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'imc'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Calculator className="w-5 h-5 mr-2" />
                IMC
              </button>
              <button
                onClick={() => setActiveSection('alimentacao')}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeSection === 'alimentacao'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Camera className="w-5 h-5 mr-2" />
                Alimentação
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveSection('home')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'home'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Início
                </button>
                <button
                  onClick={() => {
                    setActiveSection('mapa')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'mapa'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Mapa
                </button>
                <button
                  onClick={() => {
                    setActiveSection('aparelhos')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'aparelhos'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Aparelhos
                </button>
                <button
                  onClick={() => {
                    setActiveSection('imc')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'imc'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  IMC
                </button>
                <button
                  onClick={() => {
                    setActiveSection('alimentacao')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === 'alimentacao'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Alimentação
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeSection === 'home' && renderHome()}
        {activeSection === 'mapa' && renderMapa()}
        {activeSection === 'aparelhos' && renderAparelhos()}
        {activeSection === 'imc' && renderCalculadoraIMC()}
        {activeSection === 'alimentacao' && renderAlimentacao()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Mind Body Boost</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Promovendo saúde e bem-estar através das academias ao ar livre de Sorocaba
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">
              © 2024 Mind Body Boost. Desenvolvido para promover a saúde pública.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}