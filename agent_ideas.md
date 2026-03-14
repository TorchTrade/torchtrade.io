# TorchTrade Claude Code Agents

Claude Code agents (.md files) that give Claude deep domain knowledge about TorchTrade. Each agent transforms Claude into a specialized trading infrastructure expert.

---

## 1. Live Executor Agent

**File:** `live-executor.md`
**Color:** Blue (#60a5fa)
**Tagline:** Deploy trained policies to live markets with confidence.

### What It Knows
- All 4 live environments: Alpaca (stocks + crypto spot), Binance Futures, Bitget Futures, Bybit Futures
- Broker API authentication, paper/testnet vs mainnet configuration
- Position management: opening, closing, bracket orders (SL/TP)
- Error recovery: rate limiting, network failures, position desync detection
- Logging best practices: metric tracking, live data persistence, WandB integration
- Safety: liquidation handling, margin types (isolated/cross), leverage configuration

### What It Can Do
- Build complete live trading scripts from scratch
- Configure any supported broker with proper API setup
- Set up paper trading environments for safe testing
- Implement proper logging and monitoring
- Handle edge cases: partial fills, exchange maintenance, funding fees
- Create hot-reload checkpoint deployment pipelines

### Example Prompts
- "Deploy my DQN policy to Binance Futures testnet with 5x leverage on BTCUSDT"
- "Set up an Alpaca paper trading script for SPY with 5-minute bars"
- "Add proper error handling and logging to my live trading loop"
- "Create a deployment script that hot-reloads checkpoints from a training run"

### Target User
Researchers ready to go from backtest to live trading. Traders who want reliable deployment infrastructure.

---

## 2. Researcher Agent

**File:** `researcher.md`
**Color:** Purple (#a78bfa)
**Tagline:** Run rigorous RL experiments with proper methodology.

### What It Knows
- All offline environments: Sequential, SequentialSLTP, OneStep (spot + futures modes)
- Training algorithms: PPO, DQN, IQL, DSAC, GRPO, CTRL
- Hydra configuration system for experiments
- WandB experiment tracking and logging
- Multi-seed experiment methodology (minimum 3 seeds)
- Backtesting intervals and data splitting best practices
- Result visualization and plot generation

### What It Can Do
- Design experiment sweeps with proper hyperparameter grids
- Build training scripts using TorchRL collectors and loss modules
- Configure Hydra overrides for systematic ablations
- Set up WandB projects with proper grouping and tagging
- Generate publication-ready result plots (learning curves, performance comparisons)
- Enforce statistical rigor: multi-seed runs, confidence intervals, significance tests

### Example Prompts
- "Design a PPO vs DQN comparison experiment on BTC/USD 1H data with 5 seeds each"
- "Set up a hyperparameter sweep for learning rate and entropy bonus on the sequential futures env"
- "Create a training script for GRPO on the one-step environment with WandB logging"
- "Generate comparison plots from my latest experiment results"

### Target User
ML/RL researchers who want systematic, reproducible trading experiments.

---

## 3. Environment Builder Agent

**File:** `environment-builder.md`
**Color:** Green (#34d399)
**Tagline:** Build custom trading environments from scratch.

### What It Knows
- TorchTrade environment hierarchy: BaseEnv → OfflineBase → Sequential/OneStep
- TensorDict observation structure: market_data tensors + account_state
- Multi-timeframe observation system (1m + 5m + 15m + 1h simultaneously)
- Transform pipeline: feature preprocessing, normalization, Chronos embeddings
- Reward functions: LogReturn, PercentReturn, RealizedPnL, SharpeRatio
- Action spaces: discrete (3-action, SLTP combinatorial), position management
- PositionState tracking: entry price, unrealized PnL, holding time, liquidation distance

### What It Can Do
- Create custom environments extending TorchTradeBaseEnv
- Design novel observation spaces with custom features
- Implement custom reward functions for specific trading objectives
- Build SLTP (bracket order) environments with configurable SL/TP levels
- Add new transforms to the observation pipeline
- Configure domain randomization (randomized initial cash, fees, etc.)

### Example Prompts
- "Create a custom environment that rewards low drawdown instead of pure returns"
- "Add a momentum indicator to the observation space across all timeframes"
- "Build a futures environment with dynamic leverage based on volatility"
- "Explain how the account_state tensor is constructed and how to extend it"

### Target User
Developers who want to customize TorchTrade environments for their specific trading strategies.

---

## 4. Policy Analyst Agent

**File:** `policy-analyst.md`
**Color:** Pink (#f472b6)
**Tagline:** Understand what your trained agent actually learned.

### What It Knows
- PolicyAnalyzer API: behavioral fingerprint, trade-level decomposition, regime analysis
- Buy-and-Hold R² detection (the #1 diagnostic for RL trading agents)
- Regime-conditional performance analysis (trending up, trending down, sideways, volatile)
- Trade-level metrics: win rate, profit factor, average hold time, max consecutive losses
- Agent archetypes: Buy-and-Hold Mimic, Random Walker, Momentum Follower, etc.
- Actionable improvement recommendations based on diagnostic patterns

### What It Can Do
- Run complete policy evaluations on HistoryTracker data
- Diagnose why an agent is losing money or underperforming
- Detect if an agent just learned to hold (B&H R² > 0.95)
- Generate LLM-readable markdown reports with recommendations
- Compare policies across different training runs or algorithms
- Identify regime-specific weaknesses (e.g., "loses money in sideways markets")

### Example Prompts
- "Analyze the policy from my latest PPO training run — is it actually trading or just holding?"
- "Compare the DQN and GRPO policies — which one has genuine edge?"
- "Why does my agent have a great Sharpe ratio but terrible win rate?"
- "Generate a full policy report for the eval history at outputs/eval_history.json"

### Target User
Anyone training RL trading agents who needs to understand what their model actually learned.

---

## 5. Data Pipeline Agent

**File:** `data-pipeline.md`
**Color:** Orange (#fb923c)
**Tagline:** Build reliable data pipelines for training and backtesting.

### What It Knows
- Binance historical data API: spot and futures OHLCV, funding rates, basis data
- Data validation: gap detection, timezone handling, duplicate removal
- HuggingFace dataset creation with proper metadata and README
- Multi-timeframe data alignment (1m base → aggregated 5m, 15m, 1h)
- Train/validation/test splitting for time series (no data leakage)
- Data formats: CSV, Parquet, Arrow, HuggingFace datasets

### What It Can Do
- Download complete OHLCV history for any Binance-listed pair
- Validate data for gaps and anomalies
- Create HuggingFace datasets with proper documentation and plots
- Set up multi-timeframe data pipelines
- Handle funding rate and premium index data for futures
- Build data loading utilities compatible with TorchTrade environments

### Example Prompts
- "Download 2 years of BTCUSDT 1-minute data from Binance and create a HuggingFace dataset"
- "Build a data pipeline that downloads, validates, and aligns multi-timeframe data for BTC"
- "Check my OHLCV data for gaps and create a quality report"
- "Set up proper train/val/test splits avoiding lookahead bias"

### Target User
Researchers and traders who need clean, reliable market data for experiments.

---

## 6. Feature Engineer Agent

**File:** `feature-engineer.md`
**Color:** Teal (#2dd4bf)
**Tagline:** Craft informative features that give your agent an edge.

### What It Knows
- Technical indicator computation via the `ta` library (RSI, MACD, Bollinger, ATR, etc.)
- Custom feature preprocessing functions for TorchTrade environments
- Chronos time series embeddings (foundation model encodings)
- Feature normalization strategies: z-score, min-max, robust scaling
- Multi-timeframe feature alignment and aggregation
- Feature selection and importance analysis for trading signals
- Domain knowledge: which features work for trend-following, mean-reversion, volatility

### What It Can Do
- Build custom `feature_preprocessing_fn` functions for any environment config
- Add technical indicators to the observation space
- Implement Chronos embedding pipelines for time series features
- Design feature normalization that handles non-stationary financial data
- Create feature importance analysis to identify which inputs matter
- Build regime-aware feature sets that adapt to market conditions

### Example Prompts
- "Add RSI, MACD, and Bollinger Bands to my 5-minute observation space"
- "Build a feature preprocessing function that includes volume profile and VWAP"
- "Set up Chronos embeddings as additional features for my trading environment"
- "Which normalization strategy should I use for my multi-timeframe OHLCV features?"

### Target User
Researchers who want to improve their agent's observation quality and signal-to-noise ratio.

---

## 7. Network Engineer Agent

**File:** `network-engineer.md`
**Color:** Indigo (#818cf8)
**Tagline:** Design neural architectures optimized for trading.

### What It Knows
- TorchRL module system: TensorDictModule, TensorDictSequential, ProbabilisticActor
- TorchTrade model architectures: BatchNormMLP, simple encoders
- Actor-critic architectures for PPO/SAC: separate vs shared encoders
- Q-networks for DQN: dueling architectures, distributional variants
- RNN/LSTM policies for sequential decision making
- Exploration strategies: epsilon-greedy, Gaussian noise, entropy bonus
- Multi-input architectures: processing market_data + account_state separately then combining

### What It Can Do
- Design custom neural network architectures for TorchTrade environments
- Build TensorDictModule-compatible networks that handle multi-input observations
- Implement actor-critic architectures with proper value and policy heads
- Create RNN-based policies for temporal trading patterns
- Set up proper exploration schedules (epsilon decay, entropy annealing)
- Optimize network size and structure for the observation/action space

### Example Prompts
- "Design a network that processes each timeframe with its own encoder then combines them"
- "Build an actor-critic architecture for PPO on the sequential futures environment"
- "Create a dueling DQN network for the SLTP action space (19 discrete actions)"
- "Implement an LSTM policy that maintains hidden state across trading steps"

### Target User
ML engineers who want to build and customize model architectures for their trading agents.

---

## 8. Full Stack Bundle

**Includes:** All 7 agents above + priority access to new agents and updates.

**Tagline:** The complete TorchTrade AI pipeline. Data → Features → Environment → Network → Research → Analysis → Live.

### Why Bundle?
The agents are designed to work together. The Researcher agent produces histories that the Policy Analyst evaluates. The Environment Builder creates envs that the Feature Engineer enhances. The Network Engineer builds models that the Live Executor deploys. The Data Pipeline feeds them all.

### What's Included
- `live-executor.md`
- `researcher.md`
- `environment-builder.md`
- `policy-analyst.md`
- `data-pipeline.md`
- `feature-engineer.md`
- `network-engineer.md`
- Priority access to future agents
- Updates as TorchTrade evolves
